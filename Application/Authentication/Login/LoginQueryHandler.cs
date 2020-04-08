using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.ViewModels.User;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Authentication.Login
{
    public class LoginQueryHandler : HandlerBase, IRequestHandler<LoginQuery, UserViewModel>
    {
        private readonly SignInManager<ReactivityUser> signInManager;
        private readonly IMapper mapper;
        private readonly IJwtGenerator jwtGenerator;

        public LoginQueryHandler(
            DataContext context,
            SignInManager<ReactivityUser> signInManager,
            IMapper mapper,
            IJwtGenerator jwtGenerator)
                : base(context)
        {
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.jwtGenerator = jwtGenerator;
        }

        public async Task<UserViewModel> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = await this.Context.Users
                                .Include(u => u.Photos)
                                .FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user != null)
            {
                var signInResult = await this.signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (signInResult.Succeeded)
                {
                    var loggedUser = mapper.Map<UserViewModel>(user);
                    loggedUser.Token = this.jwtGenerator.CreateToken(user);
                    loggedUser.Image = user.Photos?.FirstOrDefault(p => p.IsMain)?.Url;

                    return loggedUser;
                }
            }

            throw new RestException(HttpStatusCode.Unauthorized,
                    new { user = nameof(HttpStatusCode.Unauthorized) });
        }
    }
}