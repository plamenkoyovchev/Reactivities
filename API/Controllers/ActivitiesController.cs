using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Collections.Generic;
using Domain;
using System;

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
        public async Task<IActionResult> Get(int id)
        {
            var activity = await this.mediator.Send(new ActivityDetailsQuery(id));
            if (activity == null)
            {
                return NotFound();
            }

            return Ok(activity);
        }
    }
}