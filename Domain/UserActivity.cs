using System;

namespace Domain
{
    public class UserActivity
    {
        public string ReactivityUserId { get; set; }

        public ReactivityUser ReactivityUser { get; set; }

        public Guid ActivityId { get; set; }

        public Activity Activity { get; set; }
    }
}