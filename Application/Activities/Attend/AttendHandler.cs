using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Attend
{
    public class AttendHandler : HandlerBase, IRequestHandler<AttendCommand>
    {
        private readonly IUserAccessor userAccessor;
        public AttendHandler(DataContext dataContext, IUserAccessor userAccessor)
            : base(dataContext)
        {
            this.userAccessor = userAccessor;
        }
        public async Task<Unit> Handle(AttendCommand request, CancellationToken cancellationToken)
        {
            var activity = await this.Context.Activities
                                    .Include(a => a.UserActivities)
                                    .FirstOrDefaultAsync(a => a.Id == request.ActivityId);
            if (activity == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { Activity = "Activity not found!" });
            }

            var user = await this.Context.Users.FirstAsync(u => u.UserName == this.userAccessor.GetUsername());
            if (user == null)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { User = "Not found!" });
            }

            var attendance = activity.UserActivities.FirstOrDefault(at => at.ReactivityUserId == user.Id);
            if (attendance != null)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { Activity = "You have already attended this activity!" });
            }

            this.Context.UserActivities.Add(
                new UserActivity
                {
                    ReactivityUser = user,
                    Activity = activity
                }
            );

            await this.Context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}