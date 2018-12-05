using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SignalR2WebApp.Startup))]
namespace SignalR2WebApp
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}