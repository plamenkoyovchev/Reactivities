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

namespace Application.Photos.Commands
{
    public class DeletePhotoCommandHandler : HandlerBase, IRequestHandler<DeletePhotoCommand>
    {
        private readonly IPhotoAccessor photoAcessor;
        private readonly IUserAccessor userAccessor;

        public DeletePhotoCommandHandler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAcessor)
            : base(context)
        {
            this.userAccessor = userAccessor;
            this.photoAcessor = photoAcessor;
        }

        public async Task<Unit> Handle(DeletePhotoCommand request, CancellationToken cancellationToken)
        {
            var user = await this.Context.Users
                                        .Include(u => u.Photos)
                                        .FirstOrDefaultAsync(user => user.UserName == this.userAccessor.GetUsername());

            var photo = user?.Photos.FirstOrDefault(p => p.Id == request.PublicId);
            if (photo == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not found!" });
            }

            if (photo.IsMain)
            {
                throw new RestException(HttpStatusCode.BadRequest, new { Photo = "You cannot delete your main photo" });
            }

            var deletionResult = this.photoAcessor.DeletePhoto(request.PublicId);
            if (string.IsNullOrWhiteSpace(deletionResult))
            {
                throw new Exception("Problem occured while deleting photo");
            }

            this.Context.Photo.Remove(photo);
            if (await this.Context.SaveChangesAsync() > 0)
            {
                return Unit.Value;
            }

            throw new Exception("Problem occured while saving changes");
        }
    }
}