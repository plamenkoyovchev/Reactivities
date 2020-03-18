using System;
using MediatR;

namespace Application.Activities.Attend
{
    public class AttendCommand : IRequest
    {
        public AttendCommand(Guid activityId)
        {
            this.ActivityId = activityId;
        }

        public Guid ActivityId { get; }
    }
}