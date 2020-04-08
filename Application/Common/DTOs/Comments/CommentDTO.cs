using System;

namespace Application.Common.DTOs.Comments
{
    public class CommentDTO
    {
        public Guid Id { get; set; }

        public string Body { get; set; }

        public string Username { get; set; }

        public string DisplayName { get; set; }

        public string Photo { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}