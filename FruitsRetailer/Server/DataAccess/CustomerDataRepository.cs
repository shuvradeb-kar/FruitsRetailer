using FruitsRetailer.Server.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using FruitsRetailer.WebApiController;

namespace FruitsRetailer.Server.DataAccess
{
    public class CustomerDataRepository : BaseRepository<FruitsDataContext>
    {
        FruitsDataContext _DataContext;

        public CustomerDataRepository()
        {
            _DataContext = (FruitsDataContext)base._BaseDataContext;           
        }

        public CustomerResult GetCustomersByType(CustomerType customerType, int pageNo, int pageSize, int accountNumber)
        {

            var param1 = new SqlParameter("@customerType", customerType);
            var param2 = new SqlParameter("@pageNo", pageNo);
            var param3 = new SqlParameter("@pageSize", pageSize);
            var param4 = new SqlParameter("@accountNumber", accountNumber.ToString());


            var param5 = new SqlParameter();
            param5.ParameterName = "@Count";
            param5.Direction = ParameterDirection.Output;
            param5.SqlDbType = SqlDbType.Int;

            var res = _DataContext.Database.SqlQuery<Customer>("GetCustomerByType @customerType, @pageNo, @pageSize, @accountNumber, @Count OUT", param1, param2, param3, param4, param5).ToList<Customer>();

            CustomerResult r = new CustomerResult();

            r.Count = Convert.ToInt32(param5.Value);
            r.CustomerList = res;
            return r;
        }

        public List<Stock> GetAllActiveProduct()
        {
            return this._DataContext.Stocks.Where(c => c.IsActive == true).OrderBy(c=>c.Name).ToList();
        }

        public void DeleteTransaction(int transactionId)
        {
            CustomerTransaction cus = this._DataContext.CustomerTransactions.Find(transactionId);
            this._DataContext.CustomerTransactions.Remove(cus);
            this._DataContext.SaveChanges();
            UpdateBalanceAndQuantity(cus.CustomerId, cus.Quantity, cus.ProductCode);            
        }

        private void UpdateBalanceAndQuantity(int CustomerId, int Quantity, string ProductCode)
        {
            _DataContext.Database.ExecuteSqlCommand("UpdateBalanceAndQuantity @CustomerId = {0}, @Quantity= {1}, @ProductCode = {2}", CustomerId, Quantity, ProductCode);
        }

        public void EditWholesalerTransaction(CustomerTransaction customerTransaction)
        {
            int previousQuantity = 0;
            CustomerTransaction cus = this._DataContext.CustomerTransactions.Find(customerTransaction.Id);
            previousQuantity = cus.Quantity;
            cus.AmountReceived = customerTransaction.AmountReceived;
            cus.ProductCode = customerTransaction.ProductCode;            
            cus.Quantity = customerTransaction.Quantity;
            cus.Rate = customerTransaction.Rate;
            cus.OthersCost = customerTransaction.OthersCost;
            cus.TransactionDate = customerTransaction.TransactionDate;
            cus.ProductDescription = customerTransaction.ProductDescription;
            this._DataContext.SaveChanges();

            int res = customerTransaction.Quantity - previousQuantity;

            UpdateBalanceAndQuantity(customerTransaction.CustomerId, res, customerTransaction.ProductCode);
        }

        public TransactionResult GetCustomersTransactionDetail(WholesalerFilter filter)
        {            
            var param2 = new SqlParameter("@pageNo", filter.PageNo);
            var param3 = new SqlParameter("@pageSize", filter.PageSize);
            var param4 = new SqlParameter("@customerId", filter.CustomerId.ToString());


            var param5 = new SqlParameter();
            param5.ParameterName = "@Count";
            param5.Direction = ParameterDirection.Output;
            param5.SqlDbType = SqlDbType.Int;

            var param6 = new SqlParameter();
            param6.ParameterName = "@PreviousBalance";
            param6.Direction = ParameterDirection.Output;
            param6.SqlDbType = SqlDbType.Decimal;

            var res = _DataContext.Database.SqlQuery<CustomerTransactionView>("GetCustomerTransactionDetail @pageNo, @pageSize, @customerId, @Count OUT, @PreviousBalance OUT", param2, param3, param4, param5, param6).ToList<CustomerTransactionView>();

            TransactionResult r = new TransactionResult();
            r.PreviousBalance = (DBNull.Value == param6.Value)? 0 : Convert.ToDecimal(param6.Value);
            r.Count = Convert.ToInt32(param5.Value);
            r.TransactionList = res;
            return r;
        }

        public void SaveWholesalerTransaction(CustomerTransaction customerTransaction)
        {
            this._DataContext.CustomerTransactions.Add(customerTransaction);
            this._DataContext.SaveChanges();
            UpdateBalanceAndQuantity(customerTransaction.CustomerId, customerTransaction.Quantity, customerTransaction.ProductCode);
        }

        public void AddCustomer(Customer customer)
        {
            this._DataContext.Customers.Add(customer);
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
            cus.MobileNumber = customer.MobileNumber;
            this._DataContext.SaveChanges();
        }

        public void DeleteCustomer(int customerId)
        {
            Customer cus = this._DataContext.Customers.Find(customerId);
            cus.IsActive = false;            
            this._DataContext.SaveChanges();
        }
        
    }
}