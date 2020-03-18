using System;
using MediatR;

namespace Application.Activities.Delete
{
    public class DeleteActivityCommand : IRequest
    {
        public DeleteActivityCommand(Guid id)
        {
            this.Id = id;
        }

        public Guid Id { get; set; }
    }
}