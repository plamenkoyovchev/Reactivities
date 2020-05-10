using Application.Common.DTOs.Auth;
using MediatR;

namespace Application.Authentication.FacebookLogin
{
    public class FacebookLoginQuery : IRequest<FacebookUserInfo>
    {
        public string AccessToken { get; set; }
    }
}