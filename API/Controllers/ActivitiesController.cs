using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Collections.Generic;
using Domain;
using System;
using Application.Activities.Create;

namespace API.Controllers
{
    using ActivitiesQuery = Application.Activities.List.Query;
    using ActivityDetailsQuery = Application.Activities.Details.Query;

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

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var activity = await this.mediator.Send(new ActivityDetailsQuery(id));
            if (activity == null)
            {
                return NotFound();
            }

            return Ok(activity);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CreateActivityCommand activityCommand)
        {
            var activity = await this.mediator.Send(activityCommand);
            if (activity == null)
            {
                return BadRequest();
            }

            return Ok(activity);
        }
    }
}