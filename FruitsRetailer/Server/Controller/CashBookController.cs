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
    }
}