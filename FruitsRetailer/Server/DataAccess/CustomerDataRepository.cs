using FruitsRetailer.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FruitsRetailer.Server.DataAccess
{
    public class CustomerDataRepository : BaseRepository<FruitsDataContext>
    {
        FruitsDataContext _DataContext;

        public CustomerDataRepository()
        {
            _DataContext = (FruitsDataContext)base._BaseDataContext;           
        }

        public List<Customer> GetCustomersByType(CustomerType customerType, int pageNo, int pageSize)
        {
            return this._DataContext.Customers.OrderBy(a => a.Name).ToList();
        }

        public void AddCustomer(Customer customer)
        {
            this._DataContext.Customers.Add(customer);
            this._DataContext.SaveChanges();
        }

        public void UpdateCustomer(Customer customer)
        {            
            this._DataContext.Customers.Find(customer.Id).Address = customer.Address;
            this._DataContext.Customers.Find(customer.Id).Balance = customer.Balance;
            this._DataContext.Customers.Find(customer.Id).Name = customer.Name;
            this._DataContext.SaveChanges();
        }
    }
}