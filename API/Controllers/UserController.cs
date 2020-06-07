using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.Authentication.CurrentUser;
using Application.Authentication.FacebookLogin;
using Application.Authentication.Login;
using Application.Authentication.RefreshToken;
using Application.Authentication.Register;
using Application.Common.Constants.System;
using Application.Common.DTOs.Activities;
using Application.Common.ViewModels.User;
using Application.UserProfile.Queries;
using Application.Users.Follow;
using Application.Users.FollowersList;
using Application.Users.Unfollow;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        private readonly IConfiguration config;

        public UserController(IConfiguration config)
        {
            this.config = config;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserViewModel>> Login(LoginQuery query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("fblogin")]
        public async Task<ActionResult<UserViewModel>> FbLogin(FacebookLoginQuery query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<bool>> Register(RegisterCommand command)
        {
            return await Mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserViewModel>> RefreshToken(RefreshTokenQuery query)
        {
            var principal = GetPrincipalFromExpiredToken(query.Token);
            query.Username = principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return await this.Mediator.Send(query);
        }

        [HttpGet]
        public async Task<ActionResult<UserViewModel>> GetCurrentUser()
        {
            return await this.Mediator.Send(new CurrentUserQuery());
        }

        [HttpGet("{username}/profile")]
        public async Task<ActionResult<UserProfileViewModel>> Profile(string username)
        {
            return await this.Mediator.Send(new ProfileDetailsQuery(username));
        }

        [HttpPost("{username}/follow")]
        public async Task<ActionResult<Unit>> Follow(string username)
        {
            return await this.Mediator.Send(new FollowCommand(username));
        }

        [HttpDelete("{username}/unfollow")]
        public async Task<ActionResult<Unit>> Unfollow(string username)
        {
            return await this.Mediator.Send(new UnfollowCommand(username));
        }

        [HttpGet("{username}/followings")]
        public async Task<ActionResult<List<UserProfileViewModel>>> GetFollowings(string username, FollowingType followingType)
        {
            return await this.Mediator.Send(new FollowersListQuery(username, followingType));
        }

        [HttpGet("{username}/activities")]
        public async Task<ActionResult<List<UserActivityDTO>>> GetActivities(string username, ActivityFilterType filter)
        {
            return await this.Mediator.Send(new UserActivitiesQuery(username, filter));
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParams = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config[ReactivitiesAppConstants.TokenKey])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParams, out var securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha512, StringComparison.InvariantCultureIgnoreCase)
            )
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }
    }
}