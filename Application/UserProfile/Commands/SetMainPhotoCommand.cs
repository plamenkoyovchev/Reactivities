using MediatR;

namespace Application.UserProfile.Commands
{
    public class SetMainPhotoCommand : IRequest
    {
        public string Id { get; set; }
    }
}