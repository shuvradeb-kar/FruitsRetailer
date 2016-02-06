using FruitsRetailer.Server.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
            if (cashBook.AccountNumber > 0)
            {
                UpdateBalance(0, TransactionMode.Add);
            }
        }

        public void DeleteCashBook(int cashBookId)
        {
            CashBook cashBook = this._DataContext.CashBooks.Find(cashBookId);
            this._DataContext.CashBooks.Remove(cashBook);
            this._DataContext.SaveChanges();
            if (cashBook.AccountNumber > 0)
            {
                UpdateBalance(cashBookId, TransactionMode.Delete);
            }
        }

        public CashBookResult GetCashBookDetail(int pageNo, int pageSize)
        {
            var param2 = new SqlParameter("@pageNo", pageNo);
            var param3 = new SqlParameter("@pageSize", pageSize);


            var param5 = new SqlParameter();
            param5.ParameterName = "@Count";
            param5.Direction = ParameterDirection.Output;
            param5.SqlDbType = SqlDbType.Int;

            var param6 = new SqlParameter();
            param6.ParameterName = "@PreviousBalance";
            param6.Direction = ParameterDirection.Output;
            param6.SqlDbType = SqlDbType.Decimal;


            var res = _DataContext.Database.SqlQuery<CashBookView>("GetCashBookDetail @pageNo, @pageSize, @Count OUT, @PreviousBalance OUT", param2, param3, param5, param6).ToList<CashBookView>();

            CashBookResult r = new CashBookResult();
            r.Count = Convert.ToInt32(param5.Value);
            r.PreviousBalance = (DBNull.Value == param6.Value) ? 0 : Convert.ToInt32(param6.Value);
            r.CashBookDetail = res;
            return r;
        }

        public void EditCashBook(CashBook cashBook)
        {
            CashBook cash = this._DataContext.CashBooks.Find(cashBook.Id);
            cash.Comment = cashBook.Comment;
            cash.Credit = cashBook.Credit;
            cash.Debit = cashBook.Debit;
            cash.AccountNumber = cashBook.AccountNumber;
            cash.TransactionDate = cashBook.TransactionDate;
            cash.TransactionType = cashBook.TransactionType;
            cash.IsPayment = cashBook.IsPayment;
            _DataContext.SaveChanges();
            if (cashBook.AccountNumber > 0)
            {
                UpdateBalance(cashBook.Id, TransactionMode.Edit);
            }
        }

        public List<Customer> GetAccountList()
        {
            return this._DataContext.Customers.Where(c => c.IsActive == true).ToList();
        }
        private void UpdateBalance(int cashBookId, TransactionMode mode)
        {
            _DataContext.Database.ExecuteSqlCommand("UpdateCashBoookBalance @CashBookId = {0}, @Mode = {1}", cashBookId, mode);
        }

    }
}