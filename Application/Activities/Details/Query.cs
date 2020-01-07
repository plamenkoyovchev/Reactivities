using System;
using Domain;
using MediatR;

namespace Application.Activities.Details
{
    public class Query : IRequest<Activity>
    {
        public int Id { get; private set; }

        public Query(int id)
        {
            this.Id = id;
        }
    }
}