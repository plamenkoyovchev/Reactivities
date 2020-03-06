using Application.Common.Interfaces;
using Domain;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateUser(ReactivityUser user)
        {
            return string.Empty;
        }
    }
}