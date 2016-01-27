using FruitsRetailer.Server.DataAccess;
using FruitsRetailer.Server.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FruitsRetailer.Server.Controller
{
    public class CashBookController : ApiController
    {
        CashBookDataRepository _CashBookDataRepository;

        public CashBookController() {
            _CashBookDataRepository = new CashBookDataRepository();
        }

        public CashBookResult GetCashBookDetail(int pageNo, int pageSize)
        {
            CashBookResult res = _CashBookDataRepository.GetCashBookDetail(pageNo, pageSize);
            CalculateBalance(res);
            return res;
        }

        private void CalculateBalance(CashBookResult res)
        {
            double previousBalance = res.PreviousBalance;     
            foreach (var item in res.CashBookDetail)
            {
                item.TType = item.TransactionType.ToString();

                item.Balance = previousBalance + (item.Debit - item.Credit);
                previousBalance = item.Balance;
            }
        }

        [HttpPost]
        public void SaveCashBook(CashBook cashBook) {
            if (cashBook.Id > 0)
            {
                _CashBookDataRepository.EditCashBook(cashBook);
            }
            else {
                _CashBookDataRepository.SaveCashBook(cashBook);
            }
        }
        [HttpGet]
        public List<Customer> GetAccountList()
        {
            return _CashBookDataRepository.GetAccountList();
        }    
    }
}