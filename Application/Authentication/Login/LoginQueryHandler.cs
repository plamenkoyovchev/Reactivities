using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.ViewModels.User;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Authentication.Login
{
    public class LoginQueryHandler : IRequestHandler<LoginQuery, UserViewModel>
    {
        private readonly UserManager<ReactivityUser> userManager;
        private readonly SignInManager<ReactivityUser> signInManager;
        private readonly IMapper mapper;

        public LoginQueryHandler(UserManager<ReactivityUser> userManager, SignInManager<ReactivityUser> signInManager, IMapper mapper)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.mapper = mapper;
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
                    return mapper.Map<UserViewModel>(user);
                }
            }

            throw new RestException(HttpStatusCode.Unauthorized,
                    new { user = nameof(HttpStatusCode.Unauthorized) });
        }
    }
}