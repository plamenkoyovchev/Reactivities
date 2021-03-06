using Application.Common.Mappings;
using Domain;

namespace Application.Common.ViewModels.User
{
    public class UserViewModel : IMapFrom<ReactivityUser>
    {
        public string DisplayName { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Image { get; set; }

        public string Token { get; set; }

        public string RefreshToken { get; set; }
    }
}