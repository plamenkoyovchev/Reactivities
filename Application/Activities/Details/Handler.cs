using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
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
            if (activity == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new
                {
                    activity = "Not found"
                });
            }

            return activity;
        }
    }
}