using System;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }

        public string Body { get; set; }

        public DateTime CreatedOn { get; set; }

        public ReactivityUser Author { get; set; }

        public Activity Activity { get; set; }
    }
}