using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;

namespace Application.Photos.Commands
{
    public class AddPhotoCommandHandler : IRequestHandler<AddPhotoCommand, Photo>
    {
        public Task<Photo> Handle(AddPhotoCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}