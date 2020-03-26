using System.Threading.Tasks;
using Application.Photos.Commands;
using Application.UserProfile.Commands;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm]AddPhotoCommand photo)
        {
            return await this.Mediator.Send(photo);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await this.Mediator.Send(new DeletePhotoCommand(id));
        }

        [HttpPost("{id}/setmain")]
        public async Task<ActionResult<Unit>> SetMain(string id)
        {
            return await this.Mediator.Send(new SetMainPhotoCommand(id));
        }
    }
}