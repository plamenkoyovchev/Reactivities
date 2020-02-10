using System;
using Domain;
using MediatR;

namespace Application.Activities.Details
{
    public class Query : IRequest<Activity>
    {
        public string Id { get; private set; }

        public Query(string id)
        {
            this.Id = id;
        }
    }
}