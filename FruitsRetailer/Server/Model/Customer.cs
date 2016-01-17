using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FruitsRetailer.Server.Model
{
    [Table("Customer")]
    public class Customer : IEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public int AccountNumber { get; set; }
        public string Address { get; set; }
        public CustomerType CustomerType { get; set; }
        public double Balance { get; set; }
        public bool IsActive { get; set; }
    }

    [Table("CustomerTransaction")]
    public class CustomerTransaction : IEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string ProductDescription { get; set; }        
        public DateTime TransactionDate { get; set; }
        public int Quantity { get; set; }
        public double Rate { get; set; }
        public double AmountReceived { get; set; }
        public double OthersCost { get; set; }
        public string ProductCode { get; set; }
        public int CustomerId { get; set; }
        [NotMapped]
        public double Total { get; set; }
        [NotMapped]
        public double Balance { get; set; }
    }

    public class CustomerResult  {
        public CustomerResult() {
            CustomerList = new List<Customer>();
        }
       
        public List<Customer> CustomerList { get; set; }
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
}
