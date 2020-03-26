using MediatR;

namespace Application.Photos.Commands
{
    public class DeletePhotoCommand : IRequest
    {
        public DeletePhotoCommand(string id)
        {
            this.Id = id;
        }

        public string Id { get; }
    }
}