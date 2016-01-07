using MongoDB.Driver;

namespace FruitsRetailer.Server.Util
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