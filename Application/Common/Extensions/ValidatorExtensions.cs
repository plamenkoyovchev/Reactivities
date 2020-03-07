using FluentValidation;

namespace Application.Common.Extensions
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var rules =
                ruleBuilder
                    .NotEmpty()
                    .MinimumLength(6)
                    .Matches("[A-Z]").WithMessage("Password must have at least 1 uppercase letter")
                    .Matches("[a-z]").WithMessage("Password must have at least 1 lowercase letter")
                    .Matches("[0-9]").WithMessage("Password must have a number")
                    .Matches("[^a-zA-Z0-9]").WithMessage("Password must have non alphanumeric character");

            return rules;
        }
    }
}