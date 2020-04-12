using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.Common.DTOs.Comments;
using Application.Common.Exceptions;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments.Create
{
    public class CreateCommentCommandHandler : HandlerBase, IRequestHandler<CreateCommentCommand, CommentDTO>
    {
        private readonly IMapper mapper;

        public CreateCommentCommandHandler(DataContext context, IMapper mapper)
            : base(context)
        {
            this.mapper = mapper;
        }

        public async Task<CommentDTO> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            var activity = await Context.Activities.FindAsync(request.ActivityId);
            if (activity == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { Activity = "Not found" });
            }

            var user = await Context.Users.Include(x => x.Photos).FirstOrDefaultAsync(u => u.UserName == request.Username);
            if (user == null)
            {
                throw new RestException(HttpStatusCode.NotFound);
            }

            var comment = new Comment
            {
                Activity = activity,
                Author = user,
                Body = request.Body,
                CreatedOn = DateTime.UtcNow
            };

            activity.Comments.Add(comment);

            if (await Context.SaveChangesAsync() > 0)
            {
                return mapper.Map<CommentDTO>(comment);
            }

            throw new Exception("Problem occured while saving comment");
        }
    }
}