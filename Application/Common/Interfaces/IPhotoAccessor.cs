using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Interfaces
{
    public interface IPhotoAccessor
    {
        PhotoUploadResult AddPhoto(IFormFile file);

        string DeletePhoto(string publicId);
    }
}