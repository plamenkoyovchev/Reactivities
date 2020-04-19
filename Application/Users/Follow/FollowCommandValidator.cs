using FluentValidation;

namespace Application.Users.Follow
{
    public class FollowCommandValidator : AbstractValidator<FollowCommand>
    {
        public FollowCommandValidator()
        {
            RuleFor(u => u.Username).NotEmpty();
        }
    }
}