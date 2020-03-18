using System;
using MediatR;

namespace Application.Activities.Unattend
{
    public class UnattendCommand : IRequest
    {
        public UnattendCommand(Guid activityId)
        {
            this.ActivityId = activityId;
        }

        public Guid ActivityId { get; set; }
    }
}