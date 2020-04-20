using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.ViewModels.User;

namespace Application.UserProfile
{
    public interface IProfileReader
    {
        Task<UserProfileViewModel> ReadProfileAsync(string username);

        Task<List<UserProfileViewModel>> ReadProfilesAsync(IEnumerable<string> userIds);
    }
}