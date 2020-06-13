using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System;
using Application.Activities.Create;
using Application.Activities.Delete;
using Application.Activities.Edit;
using Microsoft.AspNetCore.Authorization;
using Application.Activities.Attend;
using Application.Activities.Unattend;
using Application.Activities.FutureEventDatesList;

namespace API.Controllers
{
    using ActivitiesQuery = Application.Activities.List.Query;
    using ActivityDetailsQuery = Application.Activities.Details.Query;

    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ActivitiesController : BaseController
    {
        public async Task<IActionResult> Get([FromQuery] ActivitiesQuery query)
        {
            var activities = await this.Mediator.Send(query);

            return Ok(activities);
        }

        [HttpGet("/dates")]
        public async Task<IActionResult> GetDates(DatesListQuery query)
        {
            var activityDates = await this.Mediator.Send(query);

            return Ok(activityDates);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(Guid id)
        {
            var activity = await this.Mediator.Send(new ActivityDetailsQuery(id));
            if (activity == null)
            {
                return NotFound();
            }

            return Ok(activity);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CreateActivityCommand activityCommand)
        {
            var activity = await this.Mediator.Send(activityCommand);
            if (activity == null)
            {
                return BadRequest();
            }

            return Ok(activity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await this.Mediator.Send(new DeleteActivityCommand(id)));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, EditActivityCommand editActivityCommand)
        {
            editActivityCommand.Id = id;
            var activity = await this.Mediator.Send(editActivityCommand);

            return Ok(activity);
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return Ok(await this.Mediator.Send(new AttendCommand(id)));
        }

        [HttpDelete("{id}/attend")]
        public async Task<IActionResult> Unattend(Guid id)
        {
            return Ok(await this.Mediator.Send(new UnattendCommand(id)));
        }
    }
}