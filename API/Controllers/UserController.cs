using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Authentication.CurrentUser;
using Application.Authentication.Login;
using Application.Authentication.Register;
using Application.Common.ViewModels.User;
using Application.UserProfile.Queries;
using Application.Users.Follow;
using Application.Users.FollowersList;
using Application.Users.Unfollow;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserViewModel>> Login(LoginQuery query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<bool>> Register(RegisterCommand command)
        {
            return await Mediator.Send(command);
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
        public async Task<ActionResult<Unit>> Follow(FollowCommand command)
        {
            return await this.Mediator.Send(command);
        }

        [HttpPost("{username}/unfollow")]
        public async Task<ActionResult<Unit>> Unfollow(UnfollowCommand command)
        {
            return await this.Mediator.Send(command);
        }

        [HttpGet("{username}/followings")]
        public async Task<ActionResult<List<UserProfileViewModel>>> Followings(string username, FollowingType followingType)
        {
            return await this.Mediator.Send(new FollowersListQuery(username, followingType));
        }
    }
}