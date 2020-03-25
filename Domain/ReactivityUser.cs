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
        }

        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public ICollection<UserActivity> UserActivities { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}