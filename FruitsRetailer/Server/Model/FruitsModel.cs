using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FruitsRetailer.Server.Model
{
    
    public class CustomerResult  {
        public CustomerResult() {
            CustomerList = new List<Customer>();
        }
       
        public List<Customer> CustomerList { get; set; }
        public int Count { get; set; }
    }

    public class StockResult
    {
        public StockResult()
        {
            StockList = new List<Stock>();
        }

        public List<Stock> StockList { get; set; }
        public int Count { get; set; }
    }


    public class TransactionResult
    {
        public TransactionResult()
        {
            TransactionList = new List<CustomerTransaction>();
        }

        public List<CustomerTransaction> TransactionList { get; set; }
        public int Count { get; set; }
        public int PreviousBalance { get; set; }
    }

    public class CashBookResult
    {
        public CashBookResult()
        {
            CashBookDetail = new List<CashBook>();
        }

        public List<CashBook> CashBookDetail { get; set; }
        public int Count { get; set; }
        public int PreviousBalance { get; set; }
    }
}
