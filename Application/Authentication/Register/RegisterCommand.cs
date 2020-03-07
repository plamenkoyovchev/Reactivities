using MediatR;

namespace Application.Authentication.Register
{
    public class RegisterCommand : IRequest<bool>
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}