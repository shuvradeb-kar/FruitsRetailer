using MongoDB.Bson;

namespace FruitsRetailer.Server.Model
{
    public class Customer
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public int AccountNumber { get; set; }
        public string Address { get; set; }
        public CustomerType Type { get; set; }
    }
}
