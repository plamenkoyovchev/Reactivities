using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Delete
{
    public class DeleteActivityHandler : HandlerBase, IRequestHandler<DeleteActivityCommand>
    {
        private readonly IUserAccessor userAccessor;

        public DeleteActivityHandler(DataContext context, IUserAccessor userAccessor)
            : base(context)
        {
            this.userAccessor = userAccessor;
        }

        public async Task<Unit> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = await this.Context.Activities
                                    .Include(a => a.UserActivities)
                                    .FirstOrDefaultAsync(a => a.Id == request.Id);
            if (activity == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new
                {
                    activity = "Not found"
                });
            }

            var user = await this.Context.Users.FirstOrDefaultAsync(u => u.UserName == this.userAccessor.GetUsername());
            if (user == null)
            {
                throw new RestException(HttpStatusCode.BadRequest);
            }

            var hostUser = activity.UserActivities.FirstOrDefault(ua => ua.ReactivityUserId == user.Id && ua.IsHost);
            if (hostUser == null)
            {
                throw new RestException(HttpStatusCode.Forbidden, new { Activity = "Only hosts can delete activities!" });
            }

            this.Context.Remove(activity);
            await this.Context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}