using MongoDB.Bson;
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

    public class Result  {
        public Result() {
            CustomerList = new List<Customer>();
        }
       
        public List<Customer> CustomerList { get; set; }
        public int Count { get; set; }
    }
}
