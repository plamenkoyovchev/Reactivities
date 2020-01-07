using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.List
{
    public class Handler : HandlerBase, IRequestHandler<Query, List<Activity>>
    {
        public Handler(DataContext context) : base(context)
        {
        }

        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await this.Context.Activities.ToListAsync(cancellationToken);
        }
    }
}