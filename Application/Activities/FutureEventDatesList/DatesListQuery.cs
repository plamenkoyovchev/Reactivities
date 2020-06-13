using System;
using System.Collections.Generic;
using MediatR;

namespace Application.Activities.FutureEventDatesList
{
    public class DatesListQuery : IRequest<List<DateTime>>
    {

    }
}