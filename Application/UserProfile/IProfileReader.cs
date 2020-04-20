using System.Threading.Tasks;
using Application.Common.ViewModels.User;

namespace Application.UserProfile
{
    public interface IProfileReader
    {
        Task<UserProfileViewModel> ReadProfile(string username);
    }
}