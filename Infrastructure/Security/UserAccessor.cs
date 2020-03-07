using System.Linq;
using System.Security.Claims;
using Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public string GetUsername()
        {
            return this.httpContextAccessor.HttpContext.User?.Claims?
                        .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?
                        .Value;
        }
    }
}