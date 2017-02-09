using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace AzureAuthDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("hosting.json", optional: true)
                .Build();
                
            var host = new WebHostBuilder()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseIISIntegration()
            .UseConfiguration(config)
            .UseKestrel(options =>
                {
                    options.NoDelay = true;
                    //options.UseConnectionLogging();
                    options.UseHttps("localhost.pfx", "12345678");
                })
            .UseStartup<Startup>()
            .Build();
            
            host.Run();
        }
    }
}

