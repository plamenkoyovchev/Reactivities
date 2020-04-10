using System;
using Application.Common.DTOs.Comments;
using MediatR;

namespace Application.Comments.Create
{
    public class CreateCommentCommand : IRequest<CommentDTO>
    {
        public Guid ActivityId { get; set; }

        public string Body { get; set; }

        public string Username { get; set; }
    }
}