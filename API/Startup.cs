using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application;
using Application.Activities.Create;
using Application.Common.Constants.System;
using Application.Common.Interfaces;
using Application.UserProfile;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplication();
            services.AddDbContextPool<DataContext>(
                opt => opt.UseMySql(Configuration.GetConnectionString(ReactivitiesAppConstants.CsKey)));

            services.AllowCors();
            services.AddControllersConfig();

            services.AddSignalR();

            services.ConfigureAspNetCoreIdentity();
            services.ConfigureJwtAuthentication(Configuration);

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<IProfileReader, ProfileReader>();

            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(o => o.NoReferrer());
            app.UseXXssProtection(o => o.EnabledWithBlockMode());
            app.UseXfo(o => o.Deny());
            app.UseCspReportOnly(o => o.BlockAllMixedContent()
                                        .StyleSources(s => s.Self())
                                        .FontSources(f => f.Self())
                                        .FormActions(a => a.Self())
                                        .FrameAncestors(fa => fa.Self())
                                        .ImageSources(s => s.Self())
                                        .ScriptSources(s => s.Self()));

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
