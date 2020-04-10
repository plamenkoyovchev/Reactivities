using FluentValidation;

namespace Application.Comments.Create
{
    public class CreateCommentValidator : AbstractValidator<CreateCommentCommand>
    {
        public CreateCommentValidator()
        {
            RuleFor(c => c.Body).NotEmpty();
            RuleFor(c => c.Username).NotEmpty();
            RuleFor(c => c.ActivityId).NotEmpty();
        }
    }
}