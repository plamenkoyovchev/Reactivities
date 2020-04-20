using System.Collections.Generic;
using Application.Common.ViewModels.User;
using MediatR;

namespace Application.Users.FollowersList
{
    public class FollowersListQuery : IRequest<List<UserProfileViewModel>>
    {
        public FollowersListQuery(string username, FollowingType followingType)
        {
            this.Username = username;
            this.FollowingType = followingType;
        }

        public string Username { get; }

        public FollowingType FollowingType { get; }
    }
}