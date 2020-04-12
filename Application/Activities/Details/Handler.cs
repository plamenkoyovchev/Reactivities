using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.DTOs.Activities;
using Application.Common.Exceptions;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Details
{
    public class Handler : HandlerBase, IRequestHandler<Query, ActivityDTO>
    {
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper) : base(context)
        {
            this.mapper = mapper;
        }

        public async Task<ActivityDTO> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await this.Context.Activities
                                                .Include(a => a.Commets)
                                                .Include(a => a.UserActivities)
                                                .ThenInclude(u => u.ReactivityUser)
                                                .ThenInclude(u => u.Photos)
                                                .FirstOrDefaultAsync(a => a.Id == request.Id);
            if (activity == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new
                {
                    activity = "Not found"
                });
            }

            return mapper.Map<ActivityDTO>(activity);
        }
    }
}