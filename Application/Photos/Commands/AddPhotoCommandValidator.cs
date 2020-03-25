using FluentValidation;

namespace Application.Photos.Commands
{
    public class AddPhotoCommandValidator : AbstractValidator<AddPhotoCommand>
    {
        public AddPhotoCommandValidator()
        {
            RuleFor(p => p.File).NotEmpty();
        }
    }
}