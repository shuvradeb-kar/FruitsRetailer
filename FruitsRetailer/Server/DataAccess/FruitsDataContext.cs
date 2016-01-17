using FruitsRetailer.Server.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FruitsRetailer.Server.DataAccess
{
    public class FruitsDataContext : DbContext
    {
        public FruitsDataContext() {
            Database.SetInitializer<FruitsDataContext>(null);
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerTransaction> CustomerTransactions { get; set; }
        public DbSet<Stock> Stocks { get; set; }
    }
}