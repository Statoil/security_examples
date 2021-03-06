﻿using System;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace AzureAuthDemo
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMvc();

            
            services.AddAuthentication(
                SharedOptions => SharedOptions.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);

            services.AddAuthorization(options =>
                {
                    options.AddPolicy("CanAccessVIPArea",policyBuilder => policyBuilder.RequireRole("email"));
                    options.AddPolicy("IsDomainUser",policyBuilder => policyBuilder.RequireRole("Domain User"));
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseCookieAuthentication();

            var options = new OpenIdConnectOptions
            {
                ClientId = Environment.GetEnvironmentVariable("ASPNETCORE_CLIENTID"),
                ClientSecret = Environment.GetEnvironmentVariable("ASPNETCORE_CLIENTSECRET"),
                Authority = Configuration["Authentication:AzureAd:AADInstance"] + Environment.GetEnvironmentVariable("ASPNETCORE_TENANTID"),
                CallbackPath = Configuration["Authentication:AzureAd:CallbackPath"],
                ResponseType = OpenIdConnectResponseType.CodeIdToken,
                
                
            };
            options.GetClaimsFromUserInfoEndpoint=true;
            options.Scope.Add("address");
            options.Scope.Add("email");
            options.Scope.Add("profile");
            var tokenValidationParameters = new TokenValidationParameters();
            tokenValidationParameters.RoleClaimType = "roles";
           
            options.TokenValidationParameters = tokenValidationParameters;
                    
            app.UseOpenIdConnectAuthentication(options);
            
            

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
