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
        public async Task<ActionResult<Unit>> Delete(DeletePhotoCommand command)
        {
            return await this.Mediator.Send(command);
        }

        [HttpPost("{id}/setmain")]
        public async Task<ActionResult<Unit>> SetMain(SetMainPhotoCommand command)
        {
            return await this.Mediator.Send(command);
        }
    }
}