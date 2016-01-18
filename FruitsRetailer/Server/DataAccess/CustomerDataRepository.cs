﻿using FruitsRetailer.Server.Model;
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
            return this._DataContext.Stocks.Where(c => c.IsActive == true).ToList();
        }

        public void DeleteTransaction(int transactionId)
        {
            CustomerTransaction cus = this._DataContext.CustomerTransactions.Find(transactionId);
            this._DataContext.CustomerTransactions.Remove(cus);
            this._DataContext.SaveChanges();
        }

        public void EditWholesalerTransaction(CustomerTransaction customerTransaction)
        {
            CustomerTransaction cus = this._DataContext.CustomerTransactions.Find(customerTransaction.Id);
            cus.AmountReceived = customerTransaction.AmountReceived;
            cus.ProductCode = customerTransaction.ProductCode;
            cus.Quantity = customerTransaction.Quantity;
            cus.Rate = customerTransaction.Rate;
            cus.OthersCost = customerTransaction.OthersCost;
            cus.TransactionDate = customerTransaction.TransactionDate;
            cus.ProductDescription = customerTransaction.ProductDescription;            
            this._DataContext.SaveChanges();
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

            var res = _DataContext.Database.SqlQuery<CustomerTransaction>("GetCustomerTransactionDetail @pageNo, @pageSize, @customerId, @Count OUT, @PreviousBalance OUT", param2, param3, param4, param5, param6).ToList<CustomerTransaction>();

            TransactionResult r = new TransactionResult();
            r.PreviousBalance = (DBNull.Value == param6.Value)? 0 : Convert.ToInt32(param6.Value);
            r.Count = Convert.ToInt32(param5.Value);
            r.TransactionList = res;
            return r;
        }

        public void SaveWholesalerTransaction(CustomerTransaction customerTransaction)
        {
            this._DataContext.CustomerTransactions.Add(customerTransaction);
            this._DataContext.SaveChanges();
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
            this._DataContext.SaveChanges();
        }

        public void DeleteCustomer(int customerId)
        {
            Customer cus = this._DataContext.Customers.Find(customerId);
            cus.IsActive = false;            
            this._DataContext.SaveChanges();
        }


        //var articles = (from article in this._DataContext.Customers
        //                where article.IsActive == true && article.CustomerType == customerType && article.AccountNumber.ToString().Contains(filter.ToString())
        //                select article);

        //int totalArticles = 0;

        //var query = PagedResult(articles, pageNo, pageSize, article => article.AccountNumber, false, out totalArticles);

        //Result r = new Result();

        //r.Count = totalArticles;
        //r.CustomerList = query.ToList();
        //return r;


        //private static IQueryable<T> PagedResult<T, TResult>(IQueryable<T> query, int pageNum, int pageSize,
        //        Expression<Func<T, TResult>> orderByProperty, bool isAscendingOrder, out int rowsCount)
        //{
        //    if (pageSize <= 0) pageSize = 20;

        //    //Total result count
        //    rowsCount = query.Count();

        //    //If page number should be > 0 else set to first page
        //    if (rowsCount <= pageSize || pageNum <= 0) pageNum = 1;

        //    //Calculate nunber of rows to skip on pagesize
        //    int excludedRows = (pageNum - 1) * pageSize;

        //    query = isAscendingOrder ? query.OrderBy(orderByProperty) : query.OrderByDescending(orderByProperty);

        //    //Skip the required rows for the current page and take the next records of pagesize count
        //    return query.Skip(excludedRows).Take(pageSize);
        //} 
    }
}