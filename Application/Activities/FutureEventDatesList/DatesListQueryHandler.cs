using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.FutureEventDatesList
{
    public class DatesListQueryHandler : HandlerBase, IRequestHandler<DatesListQuery, List<DateTime>>
    {
        public DatesListQueryHandler(DataContext context)
        : base(context)
        {
        }
        public async Task<List<DateTime>> Handle(DatesListQuery request, CancellationToken cancellationToken)
        {
            var dates = await Context.Activities.Where(x => x.Date.Date >= DateTime.Now.Date)
                                          .Select(d => d.Date.Date)
                                          .Distinct()
                                          .ToListAsync();

            return dates;
        }
    }
}