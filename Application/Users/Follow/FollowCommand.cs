using MediatR;

namespace Application.Users.Follow
{
    public class FollowCommand : IRequest
    {
        public FollowCommand(string username)
        {
            this.Username = username;
        }
        public string Username { get; }
    }
}