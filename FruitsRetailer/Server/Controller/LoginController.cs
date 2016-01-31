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
            return new UserView { Role = UserAccessType.Guest, UserId = 20, Name = "Shuvro Kar", SessionId = '1' };
        }
    }

    public class LogingCredential
    {
        public string UserName { get; set; }
        public string Passsword { get; set; }
    }
}