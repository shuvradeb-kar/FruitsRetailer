using FruitsRetailer.Server.DataAccess;
using FruitsRetailer.Server.Model;
using FruitsRetailer.Server.Util;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web.Http;

namespace FruitsRetailer.WebApiController
{
    public class PurchaseController : ApiController
    {
        CustomerDataRepository _CustomerRepository;

        public PurchaseController()
        {
            _CustomerRepository = new CustomerDataRepository();
        }

        [HttpGet]
        public TransactionResult GetWholesalerTransactionDetail(string wholesalerFilter)
        {
            WholesalerFilter filterObject = JsonConvert.DeserializeObject<WholesalerFilter>(wholesalerFilter);
            return _CustomerRepository.GetCustomersTransactionDetail(filterObject);
        }

        [HttpPost]
        public void SaveWholesalerTransaction(CustomerTransaction customerTransaction)
        {
            _CustomerRepository.SaveWholesalerTransaction(customerTransaction);
        }

    }

    public class WholesalerFilter
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public int CustomerId { get; set; }
    }
}
