using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Edit
{
    public class EditActivityHandler : HandlerBase, IRequestHandler<EditActivityCommand, Activity>
    {
        public EditActivityHandler(DataContext context) : base(context)
        {
        }

        public async Task<Activity> Handle(EditActivityCommand request, CancellationToken cancellationToken)
        {
            var activityToEdit = await this.Context.Activities.FindAsync(request.Id);
            if (activityToEdit == null)
            {
                return null;
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