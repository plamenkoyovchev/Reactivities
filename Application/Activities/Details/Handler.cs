using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Details
{
    public class Handler : HandlerBase, IRequestHandler<Query, Activity>
    {
        public Handler(DataContext context) : base(context)
        {
        }

        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await this.Context.Activities.FindAsync(request.Id);

            return activity;
        }
    }
}