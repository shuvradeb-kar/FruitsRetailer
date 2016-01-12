﻿using MongoDB.Bson;
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
        public CustomerType AccountType { get; set; }
        public float Balance { get; set; }
    }
}
