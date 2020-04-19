using FluentValidation;

namespace Application.Users.Unfollow
{
    public class UnfollowCommandValidator : AbstractValidator<UnfollowCommand>
    {
        public UnfollowCommandValidator()
        {
            RuleFor(u => u.Username).NotEmpty();
        }
    }
}