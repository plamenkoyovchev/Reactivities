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
            command.Username = GetUsername();

            var comment = await this.mediator.Send(command);

            await Clients.Group($"{command.ActivityId}").SendAsync("ReceiveComment", comment);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var username = GetUsername();

            await Clients.GroupExcept(groupName, new string[] { $"{Context.ConnectionId}" })
                         .SendAsync("Send", $"{username} has joined the group");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            var username = GetUsername();

            await Clients.GroupExcept(groupName, new string[] { $"{Context.ConnectionId}" })
                         .SendAsync("Send", $"{username} has left the group");
        }

        private string GetUsername()
        {
            return Context.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        }
    }
}