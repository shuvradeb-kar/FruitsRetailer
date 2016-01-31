using FruitsRetailer.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FruitsRetailer.Server.Controller
{
    public class LoginController : ApiController
    {
        [HttpPost]
        public UserView Login(LogingCredential logingCredential)
        {
            UserView view = new UserView { Role = UserAccessType.Guest, UserId = 20, Name = "Shuvro Kar", SessionId = '1', Password="qwerty", UserName="shuvro83@gmail.com" };
            if (view.UserName == logingCredential.UserName && view.Password == logingCredential.Password)
            {
                view.IsAuthenticated = true; view.Password = string.Empty;
                return view;
            }
            view.IsAuthenticated = false;
            view.Password = string.Empty;
            return view;
        }
    }

    public class LogingCredential
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}