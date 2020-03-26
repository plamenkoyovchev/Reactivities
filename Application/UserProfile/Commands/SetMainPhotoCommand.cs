using MediatR;

namespace Application.UserProfile.Commands
{
    public class SetMainPhotoCommand : IRequest
    {
        public SetMainPhotoCommand(string id)
        {
            this.Id = id;
        }

        public string Id { get; }
    }
}