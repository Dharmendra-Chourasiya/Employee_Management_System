using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final_Assesment.Models
{
    [Table("Employee")]
    public class Employee
    {
        public int id { get; set; }
        public string emp_code { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string designation { get; set; }
        public string join_date { get; set; }
        public string padd1 { get; set; }
        public string padd2 { get; set; }
        public string cadd1 { get; set; }
        public string cadd2 { get; set; }

    }
}