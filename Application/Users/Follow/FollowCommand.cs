using MediatR;

namespace Application.Users.Follow
{
    public class FollowCommand : IRequest
    {
        public string Username { get; set; }
    }
}