using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Constants.System;
using Application.Common.DTOs.Auth;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.ViewModels.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Authentication.FacebookLogin
{
    public class FacebookLoginQueryHandler : IRequestHandler<FacebookLoginQuery, UserViewModel>
    {
        private readonly IJwtGenerator jwtGenerator;
        private readonly IFacebookAccessor fbAccessor;
        private readonly UserManager<ReactivityUser> userManager;

        public FacebookLoginQueryHandler(IJwtGenerator jwtGenerator, IFacebookAccessor fbAccessor, UserManager<ReactivityUser> userManager)
        {
            this.jwtGenerator = jwtGenerator;
            this.fbAccessor = fbAccessor;
            this.userManager = userManager;
        }

        public async Task<UserViewModel> Handle(FacebookLoginQuery request, CancellationToken cancellationToken)
        {
            var userInfo = await this.fbAccessor.FacebookLoginAsync(request.AccessToken);
            if (userInfo == null)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { User = "Login failed!" });
            }

            var user = await this.userManager.FindByEmailAsync(userInfo.Email);
            if (user == null)
            {
                user = new ReactivityUser
                {
                    DisplayName = userInfo.Name,
                    Id = userInfo.Id,
                    Email = userInfo.Email,
                    UserName = $"fb_{userInfo.Id}",
                    RefreshToken = jwtGenerator.GenerateRefreshToken(),
                    RefreshTokenExpiryDate = DateTime.Now.AddDays(ReactivitiesAppConstants.RefreshTokenExpiryInDays)
                };

                var photo = new Photo
                {
                    Id = $"fb_{userInfo.Id}",
                    Url = userInfo?.Picture?.Data?.Url,
                    IsMain = true
                };

                user.Photos.Add(photo);
                var result = await this.userManager.CreateAsync(user);
                if (!result.Succeeded)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { User = "Cannot create user!" });
                }
            }

            return new UserViewModel
            {
                DisplayName = user.DisplayName,
                Token = this.jwtGenerator.CreateToken(user),
                Username = user.UserName,
                Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                RefreshToken = user.RefreshToken
            };
        }
    }
}