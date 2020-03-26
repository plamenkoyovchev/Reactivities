using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.ViewModels.User;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Authentication.CurrentUser
{
    public class CurrentUserHandler : HandlerBase, IRequestHandler<CurrentUserQuery, UserViewModel>
    {
        private readonly IUserAccessor userAccessor;
        private readonly IJwtGenerator jwtGenerator;
        private readonly IMapper mapper;

        public CurrentUserHandler(
            DataContext context,
            IUserAccessor userAccessor,
            IJwtGenerator jwtGenerator,
            IMapper mapper)
            : base(context)
        {
            this.mapper = mapper;
            this.userAccessor = userAccessor;
            this.jwtGenerator = jwtGenerator;
        }

        public async Task<UserViewModel> Handle(CurrentUserQuery request, CancellationToken cancellationToken)
        {
            var user = await this.Context.Users
                                        .Include(u => u.Photos)
                                        .FirstOrDefaultAsync(u => u.UserName == this.userAccessor.GetUsername());
            if (user == null)
            {
                throw new RestException(HttpStatusCode.NotFound);
            }

            var currentUser = this.mapper.Map<UserViewModel>(user);
            currentUser.Token = this.jwtGenerator.CreateToken(user);
            currentUser.Image = user.Photos?.FirstOrDefault(p => p.IsMain)?.Url;

            return currentUser;
        }
    }
}