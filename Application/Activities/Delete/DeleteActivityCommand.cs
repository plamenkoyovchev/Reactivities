using System;
using MediatR;

namespace Application.Activities.Delete
{
    public class DeleteActivityCommand : IRequest
    {
        public string Id { get; set; }

        public DeleteActivityCommand(string id)
        {
            this.Id = id;
        }
    }
}