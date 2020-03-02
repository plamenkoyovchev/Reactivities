using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

namespace API.Extensions
{
    public static class IdentityExtensions
    {
        public static void AddAspNetCoreIdentity(this IServiceCollection services)
        {
            var builder = services.AddIdentityCore<ReactivityUser>();

            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<ReactivityUser>>();
        }
    }
}