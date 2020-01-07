using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Details
{
    public class Handler : IRequestHandler<Query, Activity>
    {
        private readonly DataContext context;

        public Handler(DataContext context)
        {
            this.context = context;
        }
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await this.context.Activities.FindAsync(request.Id);

            return activity;
        }
    }
}