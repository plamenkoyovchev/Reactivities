using System;
using MediatR;

namespace Application.Activities.Unattend
{
    public class UnattendCommand : IRequest
    {
        public Guid ActivityId { get; set; }
    }
}