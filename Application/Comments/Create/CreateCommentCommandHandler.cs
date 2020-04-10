using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.DTOs.Comments;
using MediatR;
using Persistence;

namespace Application.Comments.Create
{
    public class CreateCommentCommandHandler : HandlerBase, IRequestHandler<CreateCommentCommand, CommentDTO>
    {
        public CreateCommentCommandHandler(DataContext context)
            : base(context)
        {

        }

        public Task<CommentDTO> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}