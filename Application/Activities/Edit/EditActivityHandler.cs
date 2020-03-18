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

namespace Application.Activities.Edit
{
    public class EditActivityHandler : HandlerBase, IRequestHandler<EditActivityCommand, Activity>
    {
        private readonly IUserAccessor userAccessor;

        public EditActivityHandler(DataContext context, IUserAccessor userAccessor) : base(context)
        {
            this.userAccessor = userAccessor;
        }

        public async Task<Activity> Handle(EditActivityCommand request, CancellationToken cancellationToken)
        {
            var activityToEdit = await this.Context.Activities
                                            .Include(a => a.UserActivities)
                                            .FirstOrDefaultAsync(a => a.Id == request.Id);
            if (activityToEdit == null)
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

            var hostUser = activityToEdit.UserActivities.FirstOrDefault(ua => ua.ReactivityUserId == user.Id && ua.IsHost);
            if (hostUser == null)
            {
                throw new RestException(HttpStatusCode.Forbidden, new { Activity = "Only hosts can edit activities!" });
            }

            activityToEdit.Category = request.Category ?? activityToEdit.Category;
            activityToEdit.City = request.City ?? activityToEdit.City;
            activityToEdit.Date = request.Date;
            activityToEdit.Description = request.Description ?? activityToEdit.Description;
            activityToEdit.Title = request.Title ?? activityToEdit.Title;
            activityToEdit.Venue = request.Venue ?? activityToEdit.Venue;

            this.Context.Entry(activityToEdit).State = EntityState.Modified;
            await this.Context.SaveChangesAsync();

            return activityToEdit;
        }
    }
}