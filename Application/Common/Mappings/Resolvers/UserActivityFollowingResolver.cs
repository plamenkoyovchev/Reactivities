using System.Linq;
using Application.Common.DTOs.Attendee;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Common.Mappings.Resolvers
{
    public class UserActivityFollowingResolver : IValueResolver<UserActivity, AttendeeDTO, bool>
    {
        private readonly IUserAccessor userAccessor;
        private readonly DataContext context;

        public UserActivityFollowingResolver(IUserAccessor userAccessor, DataContext context)
        {
            this.userAccessor = userAccessor;
            this.context = context;
        }

        /// <summary>
        /// Check if currently logged in user is following the user which created the activity
        /// </summary>
        /// <param name="source">User Activity</param>
        /// <param name="destination"></param>
        /// <param name="destMember"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public bool Resolve(UserActivity source, AttendeeDTO destination, bool destMember, ResolutionContext context)
        {
            var currentUser = this.context.Users.FirstOrDefaultAsync(u => u.UserName == this.userAccessor.GetUsername()).Result;
            if (currentUser != null && currentUser.Followings.Any(x => x.TargetId == source.ReactivityUserId))
            {
                return true;
            }

            return false;
        }
    }
}