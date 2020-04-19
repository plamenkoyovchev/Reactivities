using MediatR;

namespace Application.Users.Unfollow
{
    public class UnfollowCommand : IRequest
    {
        public string Username { get; set; }
    }
}