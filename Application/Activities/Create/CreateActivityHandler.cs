using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Create
{
    public class CreateActivityHandler : HandlerBase, IRequestHandler<CreateActivityCommand, Activity>
    {
        private readonly IUserAccessor userAccessor;

        public CreateActivityHandler(DataContext context, IUserAccessor userAccessor)
        : base(context)
        {
            this.userAccessor = userAccessor;
        }

        public async Task<Activity> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            var newActivity = new Activity
            {
                Category = request.Category,
                City = request.City,
                Date = request.Date,
                Description = request.Description,
                Title = request.Title,
                Venue = request.Venue
            };

            this.Context.Add(newActivity);

            var user = this.Context.Users.FirstOrDefault(u => u.UserName == this.userAccessor.GetUsername());
            this.Context.UserActivities.Add(new UserActivity() { Activity = newActivity, ReactivityUser = user, IsHost = true });

            var success = await this.Context.SaveChangesAsync() > 0;
            if (!success)
            {
                return null;
            }

            return newActivity;
        }
    }
}