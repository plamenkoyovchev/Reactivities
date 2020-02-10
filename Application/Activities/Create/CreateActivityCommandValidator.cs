using FluentValidation;

namespace Application.Activities.Create
{
    public class CreateActivityCommandValidator : AbstractValidator<CreateActivityCommand>
    {
        public CreateActivityCommandValidator()
        {
            RuleFor(a => a.Title).NotEmpty();
            RuleFor(a => a.Description).NotEmpty();
        }
    }
}