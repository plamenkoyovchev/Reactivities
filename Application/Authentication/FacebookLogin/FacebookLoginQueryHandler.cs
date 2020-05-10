using System.Threading;
using System.Threading.Tasks;
using Application.Common.DTOs.Auth;
using MediatR;

namespace Application.Authentication.FacebookLogin
{
    public class FacebookLoginQueryHandler : IRequestHandler<FacebookLoginQuery, FacebookUserInfo>
    {
        public Task<FacebookUserInfo> Handle(FacebookLoginQuery request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}