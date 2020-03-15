using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class ReactivityUser : IdentityUser
    {
        public ReactivityUser()
        {
            this.UserActivities = new HashSet<UserActivity>();
        }

        public string DisplayName { get; set; }

        public ICollection<UserActivity> UserActivities { get; set; }
    }
}