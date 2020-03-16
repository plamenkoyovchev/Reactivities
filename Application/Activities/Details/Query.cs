using System;
using Application.Common.DTOs.Activities;
using MediatR;

namespace Application.Activities.Details
{
    public class Query : IRequest<ActivityDTO>
    {
        public Guid Id { get; private set; }

        public Query(Guid id)
        {
            this.Id = id;
        }
    }
}