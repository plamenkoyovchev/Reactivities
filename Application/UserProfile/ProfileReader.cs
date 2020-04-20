using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.ViewModels.User;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserProfile
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext context;
        private readonly IUserAccessor userAccessor;

        public ProfileReader(DataContext context, IUserAccessor userAccessor)
        {
            this.context = context;
            this.userAccessor = userAccessor;
        }
        public async Task<UserProfileViewModel> ReadProfileAsync(string username)
        {
            var currentUser = await this.context.Users.FirstOrDefaultAsync(x => x.UserName == this.userAccessor.GetUsername());
            var userProfile = await this.context.Users
                                        .Where(u => u.UserName == username)
                                        .Select(u => new UserProfileViewModel
                                        {
                                            DisplayName = u.DisplayName,
                                            Username = u.UserName,
                                            Bio = u.Bio,
                                            Photo = u.Photos.FirstOrDefault(p => p.IsMain),
                                            Photos = u.Photos,
                                            FollowersCount = u.Followers.Count,
                                            FollowingsCount = u.Followings.Count,
                                            Following = u.Followers.Any(f => f.ObserverId == currentUser.Id)
                                        })
                                        .FirstOrDefaultAsync();
            if (userProfile == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { User = "User not found" });
            }

            return userProfile;
        }

        public async Task<List<UserProfileViewModel>> ReadProfilesAsync(IEnumerable<string> userIds)
        {
            var currentUser = await this.context.Users.FirstOrDefaultAsync(x => x.UserName == this.userAccessor.GetUsername());
            var userProfiles = await this.context.Users
                                        .Where(u => userIds.Any(uId => u.Id == uId))
                                        .Select(u => new UserProfileViewModel
                                        {
                                            DisplayName = u.DisplayName,
                                            Username = u.UserName,
                                            Bio = u.Bio,
                                            Photo = u.Photos.FirstOrDefault(p => p.IsMain),
                                            Photos = u.Photos,
                                            FollowersCount = u.Followers.Count,
                                            FollowingsCount = u.Followings.Count,
                                            Following = u.Followers.Any(f => f.ObserverId == currentUser.Id)
                                        })
                                        .ToListAsync();

            return userProfiles;
        }
    }
}