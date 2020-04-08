using System;
using System.Collections.Generic;

namespace Domain
{
    public class Activity
    {
        public Activity()
        {
            this.UserActivities = new HashSet<UserActivity>();
            this.Commets = new HashSet<Comment>();
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        public ICollection<UserActivity> UserActivities { get; set; }

        public ICollection<Comment> Commets { get; set; }
    }
}