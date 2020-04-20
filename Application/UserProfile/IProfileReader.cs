using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.ViewModels.User;

namespace Application.UserProfile
{
    public interface IProfileReader
    {
        Task<UserProfileViewModel> ReadProfile(string username);

        Task<List<UserProfileViewModel>> ReadProfiles(IEnumerable<string> userIds);
    }
}