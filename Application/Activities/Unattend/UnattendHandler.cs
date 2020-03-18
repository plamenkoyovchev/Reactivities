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

namespace Application.Activities.Unattend
{
    public class UnattendHandler : HandlerBase, IRequestHandler<UnattendCommand>
    {
        private readonly IUserAccessor userAccessor;

        public UnattendHandler(DataContext context, IUserAccessor userAccessor)
            : base(context)
        {
            this.userAccessor = userAccessor;
        }

        public async Task<Unit> Handle(UnattendCommand request, CancellationToken cancellationToken)
        {
            var activity = await Context.Activities
                                        .Include(a => a.UserActivities)
                                        .FirstOrDefaultAsync(a => a.Id == request.ActivityId);
            if (activity == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { Activity = "Activity not found!" });
            }

            var user = await Context.Users.FirstOrDefaultAsync(u => u.UserName == this.userAccessor.GetUsername());
            if (user == null)
            {
                throw new RestException(HttpStatusCode.BadRequest);
            }

            var unattendCandidate = activity.UserActivities.FirstOrDefault(ua => ua.ReactivityUserId == user.Id);
            if (unattendCandidate == null)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { Activity = "Activity is not attended!" });
            }

            if (unattendCandidate.IsHost)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { Attendance = "You cannot remove yourself since you are the host of the activity!" });
            }

            Context.UserActivities.Remove(unattendCandidate);
            await Context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}