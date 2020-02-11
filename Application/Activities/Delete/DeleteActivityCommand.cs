using System;
using MediatR;

namespace Application.Activities.Delete
{
    public class DeleteActivityCommand : IRequest
    {
        public Guid Id { get; set; }

        public DeleteActivityCommand(Guid id)
        {
            this.Id = id;
        }
    }
}