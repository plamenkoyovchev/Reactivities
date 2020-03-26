using Application.Common.ViewModels.User;
using MediatR;

namespace Application.UserProfile.Queries
{
    public class ProfileDetailsQuery : IRequest<UserProfileViewModel>
    {
        public ProfileDetailsQuery(string username)
        {
            this.Username = username;
        }

        public string Username { get; }
    }
}