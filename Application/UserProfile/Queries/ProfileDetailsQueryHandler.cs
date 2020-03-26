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
    public class ProfileDetailsQueryHandler : HandlerBase, IRequestHandler<ProfileDetailsQuery, UserProfileViewModel>
    {
        public ProfileDetailsQueryHandler(DataContext context)
            : base(context)
        {
        }

        public async Task<UserProfileViewModel> Handle(ProfileDetailsQuery request, CancellationToken cancellationToken)
        {
            var userProfile = await this.Context.Users
                                        .Where(u => u.UserName == request.Username)
                                        .Select(u => new UserProfileViewModel
                                        {
                                            DisplayName = u.DisplayName,
                                            Username = u.UserName,
                                            Bio = u.Bio,
                                            Photo = u.Photos.FirstOrDefault(p => p.IsMain),
                                            Photos = u.Photos
                                        })
                                        .FirstOrDefaultAsync();

            if (userProfile == null)
            {
                throw new RestException(HttpStatusCode.NotFound);
            }

            return userProfile;
        }
    }
}