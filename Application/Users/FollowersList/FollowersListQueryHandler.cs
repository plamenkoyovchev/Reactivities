using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
using Application.Common.ViewModels.User;
using Application.UserProfile;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users.FollowersList
{
    public class FollowersListQueryHandler : HandlerBase, IRequestHandler<FollowersListQuery, List<UserProfileViewModel>>
    {
        private readonly IProfileReader profileReader;

        public FollowersListQueryHandler(DataContext context, IProfileReader profileReader)
            : base(context)
        {
            this.profileReader = profileReader;
        }

        public async Task<List<UserProfileViewModel>> Handle(FollowersListQuery request, CancellationToken cancellationToken)
        {
            var query = this.Context.Followings.Include(f => f.Observer).Include(f => f.Target);

            var profiles = new List<UserProfileViewModel>();
            var userFollowings = new List<UserFollower>();

            switch (request.FollowingType)
            {
                case FollowingType.Followers:
                    userFollowings = await query.Where(f => f.Target.UserName == request.Username).ToListAsync();
                    profiles.AddRange(await this.profileReader.ReadProfilesAsync(userFollowings.Select(u => u.ObserverId)));
                    break;
                case FollowingType.Followings:
                    userFollowings = await query.Where(f => f.Observer.UserName == request.Username).ToListAsync();
                    profiles.AddRange(await this.profileReader.ReadProfilesAsync(userFollowings.Select(u => u.TargetId)));
                    break;
                default:
                    throw new RestException(HttpStatusCode.BadRequest);
            }

            return profiles;
        }
    }
}