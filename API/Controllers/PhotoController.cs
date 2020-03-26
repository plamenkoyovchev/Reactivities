using System.Threading.Tasks;
using Application.Photos.Commands;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotoController : BaseController
    {
        [HttpPost]
        public async Task<Photo> Create(AddPhotoCommand photo)
        {
            return await this.Mediator.Send(photo);
        }

        [HttpDelete("{id}")]
        public Task Delete(string id)
        {
            return Task.FromResult(0);
        }
    }
}