using FruitsRetailer.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FruitsRetailer.Server.DataAccess
{
    public class CashBookDataRepository : BaseRepository<FruitsDataContext>
    {
        FruitsDataContext _DataContext;

        public CashBookDataRepository()
        {
            _DataContext = (FruitsDataContext)base._BaseDataContext;
        }

        public void SaveCashBook(CashBook cashBook)
        {
            this._DataContext.CashBooks.Add(cashBook);
            this._DataContext.SaveChanges();
        }

        public void EditCashBook(CashBook cashBook)
        {
            CashBook cash = this._DataContext.CashBooks.Find(cashBook.Id);
            cash.Comment = cashBook.Comment;
            cash.Amount = cashBook.Amount;
            cash.AccountNumber = cashBook.AccountNumber;
            cash.TransactionDate = cash.TransactionDate;
            cash.TransactionType = cashBook.TransactionType;
            _DataContext.SaveChanges();            
        }

        public List<Customer> GetAccountList()
        {
            return this._DataContext.Customers.Where(c => c.IsActive == true).ToList();
        }
    }
}