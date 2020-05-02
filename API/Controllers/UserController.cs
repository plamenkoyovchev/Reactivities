using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Authentication.CurrentUser;
using Application.Authentication.Login;
using Application.Authentication.Register;
using Application.Common.DTOs.Activities;
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
    }
}