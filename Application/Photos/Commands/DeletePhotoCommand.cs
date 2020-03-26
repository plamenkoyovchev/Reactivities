using MediatR;

namespace Application.Photos.Commands
{
    public class DeletePhotoCommand : IRequest
    {
        public string PublicId { get; set; }
    }
}