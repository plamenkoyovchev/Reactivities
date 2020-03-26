using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserProfile.Commands
{
    public class SetMainPhotoCommandHandler : HandlerBase, IRequestHandler<SetMainPhotoCommand, Unit>
    {
        private readonly IUserAccessor userAccessor;
        public SetMainPhotoCommandHandler(DataContext context, IUserAccessor userAccessor)
            : base(context)
        {
            this.userAccessor = userAccessor;
        }

        public async Task<Unit> Handle(SetMainPhotoCommand request, CancellationToken cancellationToken)
        {
            var user = await this.Context.Users
                                    .Include(u => u.Photos)
                                    .FirstOrDefaultAsync(u => u.UserName == this.userAccessor.GetUsername());

            var mainPhotoCandidate = user?.Photos.FirstOrDefault(p => p.Id == request.Id);
            if (mainPhotoCandidate == null)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { Photo = "Photo not found" });
            }

            var currentMainPhoto = user.Photos.FirstOrDefault(p => p.IsMain);
            if (currentMainPhoto != null)
            {
                currentMainPhoto.IsMain = false;
            }

            mainPhotoCandidate.IsMain = true;
            if (await this.Context.SaveChangesAsync() > 0)
            {
                return Unit.Value;
            }

            throw new Exception("Problem while saving changes");
        }
    }
}