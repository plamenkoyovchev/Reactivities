using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Comments.Create;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;

        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task SendComment(CreateCommentCommand command)
        {
            var username = Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            command.Username = username;

            var comment = await this.mediator.Send(command);

            await Clients.All.SendAsync("ReceiveComment", comment);
        }
    }
}