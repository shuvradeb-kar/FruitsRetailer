using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FruitsRetailerLib.Model
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AccountName { get; set; }
        public string Address { get; set; }
        public CustomerType Type { get; set; }
    }
}
