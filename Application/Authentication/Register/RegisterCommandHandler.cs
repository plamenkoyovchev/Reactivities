using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Authentication.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, bool>
    {
        private readonly UserManager<ReactivityUser> userManager;

        public RegisterCommandHandler(UserManager<ReactivityUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var user = await this.userManager.FindByEmailAsync(request.Email);
            if (user != null)
            {
                throw new RestException(HttpStatusCode.BadRequest,
                new
                {
                    user = "Invalid email"
                });
            }

            var result = await this.userManager.CreateAsync(
                new ReactivityUser
                {
                    Email = request.Email
                },
                request.Password
            );

            return result.Succeeded;
        }
    }
}