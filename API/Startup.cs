using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application;
using Application.Common.Constants.System;
using Application.Common.Interfaces;
using Application.UserProfile;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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
                opt => opt.UseSqlServer(Configuration.GetConnectionString(ReactivitiesAppConstants.CsKey)));

            services.AllowCors();
            services.AddControllersConfig();
            services.ConfigureVersioning();

            services.AddSignalR();

            services.ConfigureAspNetCoreIdentity();
            services.ConfigureJwtAuthentication(Configuration);

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<IProfileReader, ProfileReader>();
            services.AddScoped<IFacebookAccessor, FacebookAccessor>();

            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
            services.Configure<FacebookAppSettings>(Configuration.GetSection("Authentication:Facebook"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();

            if (!env.IsDevelopment())
            {
                app.UseHsts();
            }

            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(o => o.NoReferrer());
            app.UseXXssProtection(o => o.EnabledWithBlockMode());
            app.UseXfo(o => o.Deny());
            app.UseCsp(o => o.BlockAllMixedContent()
                                        .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "http://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/"))
                                        .FontSources(f => f.Self().CustomSources("https://fonts.gstatic.com", "data:", "http://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/"))
                                        .FormActions(a => a.Self())
                                        .FrameAncestors(fa => fa.Self())
                                        .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com", "blob:", "data:", "https://www.facebook.com/impression"))
                                        .ScriptSources(s => s.Self().CustomSources("sha256-BnXnI7/nKsgNyEHOLIM+eNRyEK27ss9YDOsYjyhLqPE=", "https://connect.facebook.net/en_US/sdk.js")));

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
