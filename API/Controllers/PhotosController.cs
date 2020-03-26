using System.Threading.Tasks;
using Application.Photos.Commands;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add(AddPhotoCommand photo)
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