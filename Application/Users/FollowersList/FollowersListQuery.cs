using System.Collections.Generic;
using Application.Common.ViewModels.User;
using MediatR;

namespace Application.Users.FollowersList
{
    public class FollowersListQuery : IRequest<List<UserProfileViewModel>>
    {
        public string Username { get; set; }

        public FollowingType FollowingType { get; set; }
    }
}