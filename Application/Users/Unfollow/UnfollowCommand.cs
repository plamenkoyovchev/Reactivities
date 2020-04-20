using MediatR;

namespace Application.Users.Unfollow
{
    public class UnfollowCommand : IRequest
    {
        public UnfollowCommand(string username)
        {
            this.Username = username;
        }

        public string Username { get; }
    }
}