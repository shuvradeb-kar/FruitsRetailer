using FruitsRetailer.Server.DataAccess;
using FruitsRetailer.Server.Model;
using FruitsRetailer.Server.Util;
using System.Web.Http;

namespace FruitsRetailer.WebApiController
{
    public class PurchaseController : ApiController
    {
        CustomerDataRepository _CustomerRepository;

        public PurchaseController()
        {
            _CustomerRepository = new CustomerDataRepository();
        }
                
        [HttpPost]
        public void SaveNewWholesaler(Customer customer)
        {
            _CustomerRepository.AddCustomer(customer);           
        }
    }
}
