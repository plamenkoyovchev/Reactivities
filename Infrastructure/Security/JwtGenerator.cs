using Application.Common.Interfaces;
using Domain;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken(ReactivityUser user)
        {
            return string.Empty;
        }
    }
}