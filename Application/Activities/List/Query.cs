using System.Collections.Generic;
using Application.Common.DTOs.Activities;
using MediatR;

namespace Application.Activities.List
{
    public class Query : IRequest<List<ActivityDTO>>
    {
    }
}