using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.DTOs.Activities;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.List
{
    public class Handler : HandlerBase, IRequestHandler<Query, ActivitiesContainer>
    {
        private readonly IMapper mapper;
        private readonly IUserAccessor userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            : base(context)
        {
            this.mapper = mapper;
            this.userAccessor = userAccessor;
        }

        public async Task<ActivitiesContainer> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = this.Context.Activities
                                        .Include(a => a.UserActivities)
                                        .ThenInclude(ua => ua.ReactivityUser)
                                        .ThenInclude(u => u.Photos)
                                        .Where(a => a.Date >= request.StartDate)
                                        .OrderBy(a => a.Date)
                                        .AsNoTracking()
                                        .AsQueryable();

            if (request.IsGoing && !request.IsHost)
            {
                query = query.Where(u => u.UserActivities.Any(
                                     ua => ua.ReactivityUser.UserName == userAccessor.GetUsername()));
            }

            if (request.IsHost && !request.IsGoing)
            {
                query = query.Where(u => u.UserActivities.Any(
                                    ua => ua.ReactivityUser.UserName == userAccessor.GetUsername() &&
                                          ua.IsHost));
            }

            var dbActivities = await query
                                .Skip(request.Offset)
                                .Take(request.Limit)
                                .ToListAsync(cancellationToken);

            var activitiesCount = await query.CountAsync();
            var activities = mapper.Map<List<ActivityDTO>>(dbActivities);

            return new ActivitiesContainer(activities, activitiesCount);
        }
    }
}