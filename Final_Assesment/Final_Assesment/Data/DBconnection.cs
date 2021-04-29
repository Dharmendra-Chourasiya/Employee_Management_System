using Final_Assesment.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Final_Assesment.Data
{
    public class DBconnection :DbContext
    {
        public DBconnection()
              : base("name=WebAPiDb")
        {

        }

        public DbSet<Employee> Employee { get; set; }
      
    }
}