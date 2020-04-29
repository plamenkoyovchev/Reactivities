using System;
using System.Collections.Generic;
using Application.Common.DTOs.Activities;
using MediatR;

namespace Application.Activities.List
{
    public class Query : IRequest<ActivitiesContainer>
    {
        public bool IsHost { get; set; }

        public bool IsGoing { get; set; }

        public DateTime? StartDate { get; set; }

        public int Limit { get; set; }

        public int Offset { get; set; }
    }
}