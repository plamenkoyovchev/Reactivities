using System;
using Application.Common.Constants.Photos;
using Application.Common.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary cloudinary;

        public PhotoAccessor(IOptions<CloudinarySettings> options)
        {
            var account = new Account(options.Value.CloudName, options.Value.ApiKey, options.Value.ApiSecret);
            this.cloudinary = new Cloudinary(account);
        }

        public PhotoUploadResult AddPhoto(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file != null && file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream)
                    };
                    uploadResult = this.cloudinary.Upload(uploadParams);
                }
            }

            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUri.AbsoluteUri
            };
        }

        public string DeletePhoto(string publicId)
        {
            var result = string.Empty;
            if (!string.IsNullOrWhiteSpace(publicId))
            {
                var deleteParams = new DeletionParams(publicId);
                result = this.cloudinary.Destroy(deleteParams).Result;
            }

            return result;
        }

        private Transformation SetCropSettings(int width = 500, int height = 500, string cropMode = CloudinaryCropModesConstants.Fill, string gravity = Gravity.Face)
        {
            return new Transformation()
                        .Width(width)
                        .Height(height)
                        .Crop(cropMode)
                        .Gravity(gravity);
        }
    }
}