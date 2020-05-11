using Application.Common.DTOs.Auth;
using Application.Common.ViewModels.User;
using MediatR;

namespace Application.Authentication.FacebookLogin
{
    public class FacebookLoginQuery : IRequest<UserViewModel>
    {
        public string AccessToken { get; set; }
    }
}