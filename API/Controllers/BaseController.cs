using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        private IMediator mediator;

        protected IMediator Mediator =>
            mediator ?? HttpContext.RequestServices.GetService<IMediator>();
    }
}