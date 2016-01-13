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

        public Result GetCustomersByType(CustomerType customerType, int pageNo, int pageSize)
        {
            Result r = new Result();

            r.Count = this._DataContext.Customers.Count();
            r.CustomerList = this._DataContext.Customers.GroupBy(i => i.AccountNumber)
                      .Select(g => g.FirstOrDefault()).OrderByDescending(i => i.AccountNumber)
                    .Skip(pageNo).Take(pageSize)
                    .ToList();
            return r;
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

        public bool IsAccountNumberExists(int accountNumber)
        {
            return (this._DataContext.Customers.Count(c => c.AccountNumber == accountNumber)) > 0 ? true : false;
        }

        public void EditCustomer(Customer customer)
        {
            Customer cus = this._DataContext.Customers.Find(customer.Id);
            cus.Name = customer.Name;
            cus.Address = customer.Address;
            this._DataContext.SaveChanges();
        }
    }
}