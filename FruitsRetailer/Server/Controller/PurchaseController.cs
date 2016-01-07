using FruitsRetailer.Server.Model;
using FruitsRetailer.Server.Util;
using System.Web.Http;

namespace FruitsRetailer.WebApiController
{
    public class PurchaseController : ApiController
    {
       
                
        [HttpPost]
        public async void SaveNewWholesaler(Customer customer)
        {            
            var collection = MongoDbConnection.GetDatabase().GetCollection<Customer>("Customers");
            var document = new Customer
            {               
                Name = customer.Name,
                Address = customer.Address,
                AccountNumber = customer.AccountNumber,
                Type = customer.Type
            };            
            //collection.InsertOneAsync(document);
            await collection.InsertOneAsync(document);
        }
    }
}
