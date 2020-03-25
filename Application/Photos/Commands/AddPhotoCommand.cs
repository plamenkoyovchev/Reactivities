using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Photos.Commands
{
    public class AddPhotoCommand : IRequest<Photo>
    {
        public IFormFile File { get; set; }
    }
}