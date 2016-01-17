using FruitsRetailer.Server.DataAccess;
using FruitsRetailer.Server.Model;
using FruitsRetailer.Server.Util;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web.Http;
using System;

namespace FruitsRetailer.WebApiController
{
    public class PurchaseController : ApiController
    {
        CustomerDataRepository _CustomerRepository;

        public PurchaseController()
        {
            _CustomerRepository = new CustomerDataRepository();
        }

        [HttpDelete]
        public void DeleteTransaction(int transactionId)
        {
            _CustomerRepository.DeleteTransaction(transactionId);
        }

        [HttpGet]
        public TransactionResult GetWholesalerTransactionDetail(string wholesalerFilter)
        {
            WholesalerFilter filterObject = JsonConvert.DeserializeObject<WholesalerFilter>(wholesalerFilter);
            TransactionResult res = _CustomerRepository.GetCustomersTransactionDetail(filterObject);
            return CalculateBalance(res);
        }

        private TransactionResult CalculateBalance(TransactionResult res)
        {
            double balance = 0;
            foreach (var item in res.TransactionList)
            {
                item.Total = item.Quantity * item.Rate;
                item.Balance = (balance + item.Total) - (item.AmountReceived + item.OthersCost);
                balance = item.Balance;
            }

            return res;
        }

        [HttpPost]
        public void SaveWholesalerTransaction(CustomerTransaction customerTransaction)
        {
            if (customerTransaction.Id > 0)
            {
                _CustomerRepository.EditWholesalerTransaction(customerTransaction);
            }
            else
            {
                _CustomerRepository.SaveWholesalerTransaction(customerTransaction);
            }
        }

    }

    public class WholesalerFilter
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public int CustomerId { get; set; }
    }
}
