using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
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
        private readonly IJwtGenerator jwtGenerator;

        public LoginQueryHandler(
            UserManager<ReactivityUser> userManager,
            SignInManager<ReactivityUser> signInManager,
            IMapper mapper,
            IJwtGenerator jwtGenerator)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.mapper = mapper;
            this.jwtGenerator = jwtGenerator;
        }

        public async Task<UserViewModel> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var user = await this.userManager.FindByEmailAsync(request.Email);
            if (user != null)
            {
                var signInResult = await this.signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (signInResult.Succeeded)
                {
                    var loggedUser = mapper.Map<UserViewModel>(user);
                    loggedUser.Token = this.jwtGenerator.CreateUser(user);
                    return loggedUser;
                }
            }

            throw new RestException(HttpStatusCode.Unauthorized,
                    new { user = nameof(HttpStatusCode.Unauthorized) });
        }
    }
}