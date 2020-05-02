using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.DTOs.Activities;
using Application.Common.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserProfile.Queries
{
    public class UserActivitiesQueryHandler : HandlerBase, IRequestHandler<UserActivitiesQuery, List<UserActivityDTO>>
    {
        public UserActivitiesQueryHandler(DataContext context)
            : base(context)
        {
        }

        public async Task<List<UserActivityDTO>> Handle(UserActivitiesQuery request, CancellationToken cancellationToken)
        {
            var user = await this.Context.Users
                                    .Include(u => u.UserActivities)
                                    .ThenInclude(ua => ua.Activity)
                                    .FirstOrDefaultAsync(u => u.UserName == request.Username);
            if (user == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });
            }

            var queryable = user.UserActivities.OrderBy(a => a.Activity.Date).AsQueryable().AsNoTracking();
            switch (request.Filter)
            {
                case ActivityFilterType.Past:
                    queryable = queryable.Where(a => a.Activity.Date <= DateTime.Now);
                    break;
                case ActivityFilterType.Hosting:
                    queryable = queryable.Where(a => a.IsHost);
                    break;
                default:
                    queryable = queryable.Where(a => a.Activity.Date >= DateTime.Now);
                    break;
            }

            return queryable.Select(a => new UserActivityDTO()
            {
                Id = a.Activity.Id,
                Title = a.Activity.Title,
                Category = a.Activity.Category,
                Date = a.Activity.Date
            })
            .ToList();
        }
    }
}