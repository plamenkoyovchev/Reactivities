using Application.Common.ViewModels.User;
using MediatR;

namespace Application.UserProfile.Queries
{
    public class ProfileDetailsQuery : IRequest<UserProfileViewModel>
    {
        public string Username { get; set; }
    }
}