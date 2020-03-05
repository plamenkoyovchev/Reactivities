using Domain;
using MediatR;

namespace Application.Authentication.Login
{
    public class LoginQuery : IRequest<string>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}