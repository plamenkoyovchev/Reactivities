using System.Threading.Tasks;
using Application.Authentication.Login;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}