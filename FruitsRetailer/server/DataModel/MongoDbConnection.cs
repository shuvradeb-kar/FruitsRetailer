using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FruitsRetailer.DataModel
{
    public class MongoDbConnection
    {
        protected static IMongoClient _client;        

        public static IMongoDatabase GetDatabase()
        {
            string connectionString = "mongodb://localhost:27017";
           
            return new MongoClient(connectionString).GetDatabase("FruitsRetailer");
        }

    }
}