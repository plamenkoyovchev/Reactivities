using System.Collections.Generic;
using Application.Common.DTOs.Activities;
using MediatR;

namespace Application.Activities.List
{
    public class Query : IRequest<ActivitiesContainer>
    {
        public Query(int limit = 10, int offset = 0)
        {
            this.Limit = limit;
            this.Offset = offset;
        }

        public int Limit { get; }

        public int Offset { get; }
    }
}