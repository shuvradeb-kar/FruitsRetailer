using FruitsRetailer.Server.DataAccess;
using FruitsRetailer.Server.Model;
using FruitsRetailer.Server.Util;
using System.Collections.Generic;
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
            customer.CustomerType = CustomerType.Wholesaler;
            _CustomerRepository.AddCustomer(customer);           
        }

        [HttpGet]
        public List<Customer> GetWholesalerList(int pageNo, int pageSize) 
        {
            return _CustomerRepository.GetCustomersByType(CustomerType.Wholesaler, pageNo, pageSize);   
        }
    }
}
