using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SignalR2WebApp.Models;
using System.Threading.Tasks;

namespace SignalR2WebApp.Hubs
{
    public class ChatHub : Hub
    {
        static List<User> Users = new List<User>();

        // Send message
        public void Send(string name, string message)
        {
            Clients.All.addMessage(name, message);
        }

        // Connect new user
        public void Connect(string userName)
        {
            var id = Context.ConnectionId;


            if (!Users.Any(x => x.Id == id))
            {
                Users.Add(new User { Id = id, LoginName = userName });

                // Send a message to current user
                Clients.Caller.onConnected(id, userName, Users);

                // Send message to all user , without current
                Clients.AllExcept(id).onNewUserConnected(id, userName);
            }
        }

        // DisconnectUser
        public override Task OnDisconnected(bool stopCalled)
        {
            var item = Users.FirstOrDefault(x => x.Id == Context.ConnectionId);
            if (item != null)
            {
                Users.Remove(item);
                var id = Context.ConnectionId;
                Clients.All.onUserDisconnected(id, item.LoginName);
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}