using System.Threading.Tasks;
using Application.Authentication.Login;
using Application.Common.ViewModels.User;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<UserViewModel>> Login(LoginQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}