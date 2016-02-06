using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FruitsRetailer.Server.Model
{
    public enum CustomerType
    {
        Retailer = 1,
        Wholesaler = 2
    }

    public enum TransactionType
    {
        Cash = 1,
        TT = 2,
        Check = 3,
        Bkash = 4,
        Others = 5
    }

    public enum UserAccessType
    {
        Admin = 1,
        Guest = 2
    }
    public enum TransactionMode
    {
        Add = 1,
        Edit = 2,
        Delete = 3
    }
}
