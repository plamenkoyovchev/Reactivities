using Domain;

namespace Application.Common.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateUser(ReactivityUser user);
    }
}