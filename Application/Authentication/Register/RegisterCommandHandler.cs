using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Constants.System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Authentication.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, bool>
    {
        private readonly UserManager<ReactivityUser> userManager;
        private readonly IJwtGenerator jwtGenerator;

        public RegisterCommandHandler(UserManager<ReactivityUser> userManager, IJwtGenerator jwtGenerator)
        {
            this.userManager = userManager;
            this.jwtGenerator = jwtGenerator;
        }

        public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            if (await this.userManager.FindByEmailAsync(request.Email) != null)
            {
                throw new RestException(HttpStatusCode.BadRequest,
                new
                {
                    Email = "Invalid Email"
                });
            }

            if (await this.userManager.FindByNameAsync(request.Username) != null)
            {
                throw new RestException(HttpStatusCode.BadRequest,
                new
                {
                    Username = "Invalid Username"
                });
            }

            var result = await this.userManager.CreateAsync(
                new ReactivityUser
                {
                    Email = request.Email,
                    UserName = request.Username,
                    DisplayName = request.DisplayName,
                    RefreshToken = jwtGenerator.GenerateRefreshToken(),
                    RefreshTokenExpiryDate = DateTime.Now.AddDays(ReactivitiesAppConstants.RefreshTokenExpiryInDays)
                },
                request.Password
            );

            if (result.Succeeded)
            {
                return result.Succeeded;
            }

            throw new Exception("Problem occured during creating user");
        }
    }
}