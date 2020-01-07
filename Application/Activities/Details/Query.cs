using System;
using Domain;
using MediatR;

namespace Application.Activities.Details
{
    public class Query : IRequest<Activity>
    {
        public Guid Id { get; private set; }

        public Query(Guid id)
        {
            this.Id = id;
        }
    }
}