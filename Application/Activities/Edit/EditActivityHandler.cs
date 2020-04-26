using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.DTOs.Activities;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Edit
{
    public class EditActivityHandler : HandlerBase, IRequestHandler<EditActivityCommand, ActivityDTO>
    {
        private readonly IUserAccessor userAccessor;
        private readonly IMapper mapper;

        public EditActivityHandler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            : base(context)
        {
            this.userAccessor = userAccessor;
            this.mapper = mapper;
        }

        public async Task<ActivityDTO> Handle(EditActivityCommand request, CancellationToken cancellationToken)
        {
            var activityToEdit = await this.Context.Activities
                                            .Include(a => a.UserActivities)
                                            .Include(a => a.Comments)
                                            .ThenInclude(c => c.Author.Photos)
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

            return mapper.Map<ActivityDTO>(activityToEdit);
        }
    }
}