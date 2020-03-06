using Application.ViewModels.User;
using Domain;
using MediatR;

namespace Application.Authentication.Login
{
    public class LoginQuery : IRequest<UserViewModel>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}