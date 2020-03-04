using FluentValidation;
namespace Application.Authentication.Login
{
    public class LoginQueryValidator : AbstractValidator<LoginQuery>
    {
        public LoginQueryValidator()
        {
            RuleFor(l => l.Email)
                        .EmailAddress()
                        .NotEmpty();

            RuleFor(l => l.Password).NotEmpty();
        }
    }
}