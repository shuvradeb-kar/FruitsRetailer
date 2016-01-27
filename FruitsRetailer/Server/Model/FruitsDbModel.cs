using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

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
        [NotMapped]
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        [NotMapped]
        public double Total { get; set; }
        [NotMapped]
        public double Balance { get; set; }
    }

    [Table("Stock")]
    public class Stock : IEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int Quantity { get; set; }
        public bool IsActive { get; set; }
    }

    [Table("CashBook")]
    public class CashBook : IEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int AccountNumber { get; set; }
        public bool IsPayment { get; set; }
        public TransactionType TransactionType { get; set; }
        public DateTime TransactionDate { get; set; }
        public double Debit { get; set; }
        public double Credit { get; set; }
        public string Comment { get; set; }        
    }
}