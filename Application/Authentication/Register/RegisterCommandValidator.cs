using FluentValidation;

namespace Application.Authentication.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(u => u.Email).EmailAddress().NotEmpty();
            RuleFor(u => u.Password).NotEmpty().MinimumLength(8);
        }
    }
}