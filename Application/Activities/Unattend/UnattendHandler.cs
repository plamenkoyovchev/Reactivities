using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Application.Activities.Unattend
{
    public class UnattendHandler : IRequestHandler<UnattendCommand>
    {
        public Task<Unit> Handle(UnattendCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}