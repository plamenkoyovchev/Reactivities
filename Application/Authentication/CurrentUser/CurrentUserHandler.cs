using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.ViewModels.User;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Authentication.CurrentUser
{
    public class CurrentUserHandler : IRequestHandler<CurrentUserQuery, UserViewModel>
    {
        private readonly UserManager<ReactivityUser> userManager;
        private readonly IUserAccessor userAccessor;
        private readonly IJwtGenerator jwtGenerator;
        private readonly IMapper mapper;
        public CurrentUserHandler(
            UserManager<ReactivityUser> userManager,
            IUserAccessor userAccessor,
            IJwtGenerator jwtGenerator,
            IMapper mapper)
        {
            this.mapper = mapper;
            this.userManager = userManager;
            this.userAccessor = userAccessor;
            this.jwtGenerator = jwtGenerator;
        }
        public async Task<UserViewModel> Handle(CurrentUserQuery request, CancellationToken cancellationToken)
        {
            var user = await this.userManager.FindByNameAsync(this.userAccessor.GetUsername());
            var currentUser = this.mapper.Map<UserViewModel>(user);
            currentUser.Token = this.jwtGenerator.CreateToken(user);

            return currentUser;
        }
    }
}