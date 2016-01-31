using FruitsRetailer.Server.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FruitsRetailer.Server.Controller
{
    public class CommonController : ApiController
    {
        [HttpGet]
        public Dictionary<string, string> GetCustomeValues() {
            Dictionary<string, string> list = new Dictionary<string, string>();

            list.Add("CompanyName", FruitsHelper.CompanyName);
            list.Add("CompanySlogan", FruitsHelper.CompanySlogan);
            list.Add("CompanyProprietor", FruitsHelper.CompanyProprietor);
            list.Add("CompanyAddress", FruitsHelper.CompanyAddress);
            list.Add("GodName", FruitsHelper.GodName);
            list.Add("ProprietorContactNumber", FruitsHelper.ProprietorContactNumber);
            
            return list;
        }
    }
}