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
        }

        public CashBookResult GetCashBookDetail(int pageNo, int pageSize)
        {
            var param2 = new SqlParameter("@pageNo", pageNo);
            var param3 = new SqlParameter("@pageSize", pageSize);


            var param5 = new SqlParameter();
            param5.ParameterName = "@Count";
            param5.Direction = ParameterDirection.Output;
            param5.SqlDbType = SqlDbType.Int;

            var res = _DataContext.Database.SqlQuery<CashBook>("GetCashBookDetail @pageNo, @pageSize, @Count OUT", param2, param3, param5).ToList<CashBook>();

            CashBookResult r = new CashBookResult();
            r.Count = Convert.ToInt32(param5.Value);
            r.CashBookDetail = res;
            return r;
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