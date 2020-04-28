using System;
using System.Collections.Generic;
using Application.Common.DTOs.Activities;
using MediatR;

namespace Application.Activities.List
{
    public class Query : IRequest<ActivitiesContainer>
    {
        public Query(bool isGoing, bool isHost, DateTime? startDate, int limit = 10, int offset = 0)
        {
            this.IsHost = isHost;
            this.IsGoing = isGoing;
            this.StartDate = startDate;
            this.Limit = limit;
            this.Offset = offset;
        }

        public bool IsHost { get; }

        public bool IsGoing { get; }

        public DateTime? StartDate { get; }

        public int Limit { get; }

        public int Offset { get; }
    }
}