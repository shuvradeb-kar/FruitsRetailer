using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FruitsRetailer.DataModel
{
    public class MongoDbConnection
    {
        protected static IMongoClient _client;
        protected static IMongoDatabase _database;

        string connectionString = "mongodb://localhost:27017";
        _client = new MongoClient(connectionString);
        _database = _client.GetDatabase("FruitsRetailer");

    }
}