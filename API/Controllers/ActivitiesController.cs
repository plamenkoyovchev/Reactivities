using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Collections.Generic;
using Domain;

namespace API.Controllers
{
    using ActivitiesQuery = Application.Activities.List.Query;

    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public ActivitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task<IActionResult> Get()
        {
            var activities = await this.mediator.Send(new ActivitiesQuery());

            return Ok(activities);
        }
    }
}