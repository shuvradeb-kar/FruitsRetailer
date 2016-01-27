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
            CashBookDetail = new List<CashBookView>();
        }

        public List<CashBookView> CashBookDetail { get; set; }
        public int Count { get; set; }
        public int PreviousBalance { get; set; }
    }

    public class CashBookView
    {
        public int Id { get; set; }
        public int AccountNumber { get; set; }
        public bool IsPayment { get; set; }
        public TransactionType TransactionType { get; set; }
        public DateTime TransactionDate { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public string Comment { get; set; }
        public string AccountHolderName { get; set; }
        public string AccountHolderAddress { get; set; }
        public double Balance { get; set; }
        public string TType { get; set; }
    }
}
