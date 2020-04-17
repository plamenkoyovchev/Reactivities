using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class ReactivityUser : IdentityUser
    {
        public ReactivityUser()
        {
            this.UserActivities = new HashSet<UserActivity>();
            this.Photos = new HashSet<Photo>();
            this.Comments = new HashSet<Comment>();
            this.Followings = new HashSet<UserFollower>();
            this.Followers = new HashSet<UserFollower>();
        }

        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public ICollection<UserActivity> UserActivities { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<UserFollower> Followings { get; set; }

        public ICollection<UserFollower> Followers { get; set; }
    }
}