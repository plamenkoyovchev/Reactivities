using System.Threading.Tasks;
using Application.Common.DTOs.Auth;

namespace Application.Common.Interfaces
{
    public interface IFacebookAccessor
    {
        Task<FacebookUserInfo> FacebookLogin(string accessToken);
    }
}