using MongoDB.Driver;
using System.Configuration;

namespace FruitsRetailer.Server.Util
{
    public class FruitsHelper
    {
        public static string DatabaseConnectionString = ConfigurationManager.AppSettings["DatabaseConnectionString"];
    }
}