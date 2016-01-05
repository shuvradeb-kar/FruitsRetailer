﻿using FruitsRetailerLib.Model;
using MongoDB.Driver;
using System.Web.Http;
using System;
using System.Threading.Tasks;
using MongoDB.Bson;


namespace FruitsRetailer.WebApiController
{
    public class PurchaseController : ApiController
    {
       
                
        [HttpPost]
        public async void SaveNewWholesaler(Customer customer)
        {
            
            var collection = _database.GetCollection<Customer>("Customers");
            var document = new Customer
            {               
                Name = customer.Name,
                Address = customer.Address,
                AccountNumber = customer.AccountNumber,
                Type = customer.Type
            };            
            //collection.InsertOneAsync(document);
            await collection.InsertOneAsync(document);
        }
    }
}
