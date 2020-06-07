using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Application.Authentication.RefreshToken
{
    public class RefreshTokenHandler : IRequestHandler<RefreshTokenQuery>
    {
        public Task<Unit> Handle(RefreshTokenQuery request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}