using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.DTOs.Activities;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.List
{
    public class Handler : HandlerBase, IRequestHandler<Query, ActivitiesContainer>
    {
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper) : base(context)
        {
            this.mapper = mapper;
        }

        public async Task<ActivitiesContainer> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = this.Context.Activities
                                        .Include(a => a.UserActivities)
                                        .ThenInclude(ua => ua.ReactivityUser)
                                        .ThenInclude(u => u.Photos)
                                        .Where(a => a.Date >= DateTime.Now)
                                        .OrderBy(a => a.Date)
                                        .AsNoTracking()
                                        .AsQueryable();

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