using System.Collections.Generic;
using Domain;
using MediatR;

namespace Application.Activities.List
{
    public class Query : IRequest<List<Activity>>
    {
    }
}