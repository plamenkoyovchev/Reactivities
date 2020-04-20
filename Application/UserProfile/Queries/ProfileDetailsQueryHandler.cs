using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
using Application.Common.ViewModels.User;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserProfile.Queries
{
    public class ProfileDetailsQueryHandler : IRequestHandler<ProfileDetailsQuery, UserProfileViewModel>
    {
        private readonly IProfileReader profileReader;
        public ProfileDetailsQueryHandler(IProfileReader profileReader)
        {
            this.profileReader = profileReader;
        }

        public async Task<UserProfileViewModel> Handle(ProfileDetailsQuery request, CancellationToken cancellationToken)
        {
            var userProfile = await profileReader.ReadProfile(request.Username);

            return userProfile;
        }
    }
}