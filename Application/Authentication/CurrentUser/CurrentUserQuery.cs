using Application.Common.ViewModels.User;
using MediatR;

namespace Application.Authentication.CurrentUser
{
    public class CurrentUserQuery : IRequest<UserViewModel>
    {
    }
}