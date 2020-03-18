using System;
using Application.Common.DTOs.Activities;
using MediatR;

namespace Application.Activities.Details
{
    public class Query : IRequest<ActivityDTO>
    {
        public Query(Guid id)
        {
            this.Id = id;
        }

        public Guid Id { get; }
    }
}