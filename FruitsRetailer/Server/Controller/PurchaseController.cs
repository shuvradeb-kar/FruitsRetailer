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
        public void SaveWholesaler(Customer customer)
        {
            if (customer.Id > 0)
            {
                _CustomerRepository.EditCustomer(customer);
            }
            else
            {
                customer.CustomerType = CustomerType.Wholesaler;
                _CustomerRepository.AddCustomer(customer);
            }
        }

        [HttpGet]
        public Result GetWholesalerList(int pageNo, int pageSize) 
        {
            return _CustomerRepository.GetCustomersByType(CustomerType.Wholesaler, pageNo, pageSize);   
        }

        [HttpGet]
        public bool IsAccountNumberExists(int accountNumber)
        {
            return _CustomerRepository.IsAccountNumberExists(accountNumber);
        }

        [HttpDelete]
        public void DeleteCustomer(int customerId)
        {
            _CustomerRepository.DeleteCustomer(customerId);
        }
    }
}
