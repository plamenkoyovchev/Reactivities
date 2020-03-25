using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Commands
{
    public class AddPhotoCommandHandler : HandlerBase, IRequestHandler<AddPhotoCommand, Photo>
    {
        private readonly IUserAccessor userAccessor;
        private readonly IPhotoAccessor photoAccessor;

        public AddPhotoCommandHandler(DataContext dataContext, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            : base(dataContext)
        {
            this.photoAccessor = photoAccessor;
            this.userAccessor = userAccessor;
        }

        public async Task<Photo> Handle(AddPhotoCommand request, CancellationToken cancellationToken)
        {
            var uploadResult = this.photoAccessor.AddPhoto(request.File);
            var user = await this.Context.Users
                                            .Include(u => u.Photos)
                                            .FirstOrDefaultAsync(u => u.UserName == this.userAccessor.GetUsername());

            var newPhoto = new Photo()
            {
                Id = uploadResult.PublicId,
                Url = uploadResult.Url
            };

            if (!user.Photos.Any(p => p.IsMain))
            {
                newPhoto.IsMain = true;
            }

            user.Photos.Add(newPhoto);
            if (await this.Context.SaveChangesAsync() > 0)
            {
                return newPhoto;
            }

            throw new Exception("Problem occured while saving the photo!");
        }
    }
}