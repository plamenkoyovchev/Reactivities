using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class ReactivityUser : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}