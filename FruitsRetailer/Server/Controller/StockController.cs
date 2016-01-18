using FruitsRetailer.Server.DataAccess;
using FruitsRetailer.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FruitsRetailer.Server.Controller
{
    public class StockController : ApiController
    {
        StockDataRepository _StockDataRepository;

        public StockController()
        {
            _StockDataRepository = new StockDataRepository();
        }
        [HttpPost]
        public void SaveStock(Stock stock)
        {
            if (stock.Id > 0)
            {
                _StockDataRepository.EditStock(stock);
            }
            else {
                stock.IsActive = true;
                _StockDataRepository.SaveStock(stock);
            }
        }
        [HttpGet]
        public bool IsProductCodeExist(string code)
        {
            return _StockDataRepository.IsProductCodeExist(code);
        }

        public StockResult GetProductList(int pageNo, int pageSize) {
            return _StockDataRepository.GetProductList(pageNo, pageSize);
        }
        [HttpDelete]
        public void DeleteProduct(int productId)
        {
            _StockDataRepository.DeleteProduct(productId);
        }
    }
}