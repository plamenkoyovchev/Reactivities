using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.ViewModels.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Authentication.Login
{
    public class LoginQueryHandler : IRequestHandler<LoginQuery, UserViewModel>
    {
        private readonly UserManager<ReactivityUser> userManager;
        private readonly SignInManager<ReactivityUser> signInManager;

        public LoginQueryHandler(UserManager<ReactivityUser> userManager, SignInManager<ReactivityUser> signInManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        public async Task<UserViewModel> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = await this.userManager.FindByEmailAsync(request.Email);
            if (user != null)
            {
                var signInResult = await this.signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (signInResult.Succeeded)
                {
                    // TODO generate token
                    return new UserViewModel
                    {
                        DisplayName = user.DisplayName,
                        Username = user.UserName,
                        EMail = user.Email
                    };
                }
            }

            throw new RestException(HttpStatusCode.Unauthorized,
                    new { user = nameof(HttpStatusCode.Unauthorized) });
        }
    }
}