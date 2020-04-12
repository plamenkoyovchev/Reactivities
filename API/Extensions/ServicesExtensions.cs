using Application.Activities.Create;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace API.Extensions
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddControllersConfig(this IServiceCollection services)
        {
            services
                .AddControllers(opt =>
                {
                    var authPolicy = new AuthorizationPolicyBuilder()
                                            .RequireAuthenticatedUser()
                                            .Build();
                    opt.Filters.Add(new AuthorizeFilter(authPolicy));
                })
                .AddFluentValidation(cfg =>
                {
                    cfg.RegisterValidatorsFromAssemblyContaining<CreateActivityCommandValidator>();
                })
                .AddNewtonsoftJson(opt =>
                {
                    opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

            return services;
        }

        public static IServiceCollection AllowCors(this IServiceCollection services)
        {
            services.AddCors(opt => opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader()
                      .AllowAnyMethod()
                      .WithOrigins("http://localhost:3000")
                      .AllowCredentials();
            }));

            return services;
        }
    }
}