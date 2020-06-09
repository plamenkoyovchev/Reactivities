using Application.Activities.Create;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Versioning;
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
                      .WithExposedHeaders("WWW-Authenticate")
                      .WithOrigins("http://localhost:3000")
                      .AllowCredentials();
            }));

            return services;
        }

        public static IServiceCollection ConfigureVersioning(this IServiceCollection services)
        {
            services.AddApiVersioning(opt =>
            {
                opt.ReportApiVersions = true;
                opt.AssumeDefaultVersionWhenUnspecified = true;
                opt.DefaultApiVersion = new ApiVersion(2, 0);

                opt.ApiVersionReader = ApiVersionReader.Combine(
                    new QueryStringApiVersionReader("api-version"),
                    new HeaderApiVersionReader("api-version"));
            });

            return services;
        }
    }
}