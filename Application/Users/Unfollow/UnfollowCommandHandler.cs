using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users.Unfollow
{
    public class UnfollowCommandHandler : HandlerBase, IRequestHandler<UnfollowCommand, Unit>
    {
        private readonly IUserAccessor userAccessor;
        private readonly UserManager<ReactivityUser> userManager;
        public UnfollowCommandHandler(DataContext context, IUserAccessor userAccessor, UserManager<ReactivityUser> userManager)
            : base(context)
        {
            this.userAccessor = userAccessor;
            this.userManager = userManager;
        }
        public async Task<Unit> Handle(UnfollowCommand request, CancellationToken cancellationToken)
        {
            var currentUsername = this.userAccessor.GetUsername();
            if (currentUsername == request.Username)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { User = "You can't unfollow yourself" });
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

            var following = await this.Context.Followings.FirstOrDefaultAsync(f => f.ObserverId == observer.Id && f.TargetId == target.Id);
            if (following == null)
            {
                throw new RestException(HttpStatusCode.BadRequest);
            }

            this.Context.Followings.Remove(following);
            if (await this.Context.SaveChangesAsync() > 0)
            {
                return Unit.Value;
            }

            throw new Exception($"Unable to unfollow {request.Username}");
        }
    }
}