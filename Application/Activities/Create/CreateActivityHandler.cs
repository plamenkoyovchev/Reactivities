using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Create
{
    public class CreateActivityHandler : HandlerBase, IRequestHandler<CreateActivityCommand, Activity>
    {
        public CreateActivityHandler(DataContext context) : base(context)
        {
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
            var success = await this.Context.SaveChangesAsync() > 0;

            if (!success)
            {
                return null;
            }

            return newActivity;
        }
    }
}