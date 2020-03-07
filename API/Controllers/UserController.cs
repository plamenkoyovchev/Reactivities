using System.Threading.Tasks;
using Application.Authentication.CurrentUser;
using Application.Authentication.Login;
using Application.Authentication.Register;
using Application.Common.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<UserViewModel>> Login(LoginQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost("register")]
        public async Task<ActionResult<bool>> Register(RegisterCommand command)
        {
            return await Mediator.Send(command);
        }

        [Authorize]
        [HttpGet("user")]
        public async Task<ActionResult<UserViewModel>> GetCurrentUser()
        {
            return await this.Mediator.Send(new CurrentUserQuery());
        }
    }
}