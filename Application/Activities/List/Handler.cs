using System.Collections.Generic;
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
    public class Handler : HandlerBase, IRequestHandler<Query, List<ActivityDTO>>
    {
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper) : base(context)
        {
            this.mapper = mapper;
        }

        public async Task<List<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
            var dbActivities = await this.Context.Activities
                                        .Include(a => a.UserActivities)
                                        .ThenInclude(ua => ua.ReactivityUser)
                                        .ToListAsync(cancellationToken);

            return mapper.Map<List<ActivityDTO>>(dbActivities);
        }
    }
}