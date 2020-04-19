using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users.Follow
{
    public class FollowCommandHandler : HandlerBase, IRequestHandler<FollowCommand>
    {
        private readonly IUserAccessor userAccessor;
        private readonly UserManager<ReactivityUser> userManager;

        public FollowCommandHandler(DataContext context, IUserAccessor userAccessor, UserManager<ReactivityUser> userManager)
            : base(context)
        {
            this.userManager = userManager;
            this.userAccessor = userAccessor;

        }
        public async Task<Unit> Handle(FollowCommand request, CancellationToken cancellationToken)
        {
            var currentUsername = this.userAccessor.GetUsername();
            if (currentUsername == request.Username)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { User = "You can't follow yourself" });
            }

            var observer = await this.userManager.FindByNameAsync(currentUsername);
            if (observer == null)
            {
                throw new RestException(HttpStatusCode.NotFound);
            }

            var target = await this.userManager.FindByNameAsync(request.Username);
            if (target == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { User = "Followee not found" });
            }

            this.Context.Followings.Add(new UserFollower
            {
                Observer = observer,
                Target = target
            });

            if (await this.Context.SaveChangesAsync() > 0)
            {
                return Unit.Value;
            }

            throw new Exception($"Unable to follow {request.Username}");
        }
    }
}