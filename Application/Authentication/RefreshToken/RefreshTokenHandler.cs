using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Constants.System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.ViewModels.User;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Authentication.RefreshToken
{
    public class RefreshTokenHandler : IRequestHandler<RefreshTokenQuery, UserViewModel>
    {
        private readonly UserManager<ReactivityUser> userManager;
        private readonly IJwtGenerator jwtGenerator;
        private readonly IMapper mapper;

        public RefreshTokenHandler(UserManager<ReactivityUser> userManager, IJwtGenerator jwtGenerator, IMapper mapper)
        {
            this.userManager = userManager;
            this.jwtGenerator = jwtGenerator;
            this.mapper = mapper;
        }
        public async Task<UserViewModel> Handle(RefreshTokenQuery request, CancellationToken cancellationToken)
        {
            var user = await this.userManager.FindByNameAsync(request.Username);
            if (user == null || user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryDate < DateTime.Now)
            {
                throw new RestException(HttpStatusCode.Unauthorized);
            }

            user.RefreshToken = this.jwtGenerator.GenerateRefreshToken();
            user.RefreshTokenExpiryDate = DateTime.Now.AddDays(ReactivitiesAppConstants.RefreshTokenExpiryInDays);
            await this.userManager.UpdateAsync(user);

            var userModel = this.mapper.Map<UserViewModel>(user);
            userModel.Token = this.jwtGenerator.CreateToken(user);

            return userModel;
        }
    }
}