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
        public decimal Balance { get; set; }
        public bool IsActive { get; set; }
        public string MobileNumber { get; set; }
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
        public decimal Rate { get; set; }
        public decimal AmountReceived { get; set; }
        public decimal OthersCost { get; set; }
        public string ProductCode { get; set; }
        public int CustomerId { get; set; }      
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

    [Table("User")]
    public class User : IEntity
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string LoginUserName { get; set; }
        public string Password { get; set; }
        public UserAccessType Access { get; set; }        
    }
}