using Application.Common.ViewModels.User;
using MediatR;

namespace Application.Authentication.RefreshToken
{
    public class RefreshTokenQuery : IRequest<UserViewModel>
    {
        public string Username { get; set; }

        public string Token { get; set; }

        public string RefreshToken { get; set; }
    }
}