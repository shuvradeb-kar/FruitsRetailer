using FruitsRetailer.Server.DataAccess;
using FruitsRetailer.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FruitsRetailer.Server.Controller
{
    public class RetailerController : ApiController
    {
        CustomerDataRepository _CustomerRepository;
        public RetailerController()
        {
            _CustomerRepository = new CustomerDataRepository();
        }

        [HttpPost]
        public void SaveRetailer(Customer customer)
        {
            if (customer.Id > 0)
            {
                _CustomerRepository.EditCustomer(customer);
            }
            else
            {
                customer.CustomerType = CustomerType.Retailer;
                customer.IsActive = true;
                _CustomerRepository.AddCustomer(customer);
            }
        }

        [HttpGet]
        public CustomerResult GetRetailerList(int pageNo, int pageSize, int filter)
        {
            return _CustomerRepository.GetCustomersByType(CustomerType.Retailer, pageNo, pageSize, filter);
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