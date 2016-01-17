using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FruitsRetailer.Server.Model;
using System.Data.SqlClient;
using System.Data;

namespace FruitsRetailer.Server.DataAccess
{
    public class StockDataRepository : BaseRepository<FruitsDataContext>
    {
        FruitsDataContext _DataContext;

        public StockDataRepository()
        {
            _DataContext = (FruitsDataContext)base._BaseDataContext;
        }

        public void SaveStock(Stock stock)
        {
            this._DataContext.Stocks.Add(stock);
            this._DataContext.SaveChanges();
        }

        public bool IsProductCodeExist(string code)
        {
            return (this._DataContext.Stocks.Count(c => c.Code == code)) > 0 ? true : false;
        }

        public StockResult GetProductList(int pageNo, int pageSize)
        {
            var param2 = new SqlParameter("@pageNo", pageNo);
            var param3 = new SqlParameter("@pageSize", pageSize);            


            var param5 = new SqlParameter();
            param5.ParameterName = "@Count";
            param5.Direction = ParameterDirection.Output;
            param5.SqlDbType = SqlDbType.Int;
            
            var res = _DataContext.Database.SqlQuery<Stock>("GetProductList @pageNo, @pageSize, @Count OUT", param2, param3, param5).ToList<Stock>();

            StockResult r = new StockResult();            
            r.Count = Convert.ToInt32(param5.Value);
            r.StockList = res;
            return r;
        }
    }
}