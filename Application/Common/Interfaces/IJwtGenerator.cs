using Domain;

namespace Application.Common.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(ReactivityUser user);
        string GenerateRefreshToken();
    }
}