using MongoDB.Driver;
using System.Configuration;

namespace FruitsRetailer.Server.Util
{
    public class FruitsHelper
    {
        public static string DatabaseConnectionString = ConfigurationManager.AppSettings["DatabaseConnectionString"];

        public static string CompanyName = ConfigurationManager.AppSettings["CompanyName"];
        public static string CompanySlogan = ConfigurationManager.AppSettings["CompanySlogan"];
        public static string CompanyProprietor = ConfigurationManager.AppSettings["CompanyProprietor"];
        public static string CompanyAddress = ConfigurationManager.AppSettings["CompanyAddress"];
        public static string GodName = ConfigurationManager.AppSettings["GodName"];
        public static string ProprietorContactNumber = ConfigurationManager.AppSettings["ProprietorContactNumber"];
    }
}