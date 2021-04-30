using Final_Assesment.Data;
using Final_Assesment.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace Final_Assesment.Controllers
{
    public class EmployeeController : ApiController
    {


        [HttpGet]         // we can give custom method name by using Http verb
        public IEnumerable<Employee> ReadAllData()
        {
            using (DBconnection con = new DBconnection())
            {
                return con.Employee.ToList();
            }
        }

        /*  public HttpResponseMessage AddEmployee([FromBody]Employee emp)
          {
              using (DBconnection con = new DBconnection())
              {
                  var checkemail = con.Employee.FirstOrDefault(e => e.email == emp.email);

                  if (checkemail != null)
                  {

                      return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Dublicate Email Id");
                  }
                  var result = con.Employee.Add(emp);

                  con.SaveChanges();
                  return Request.CreateResponse(HttpStatusCode.OK,result); 
              }
          }
      */

        // Email And emp_code can not be dublicate
      /*  public Employee AddEmployee(Employee employee)
        {
            using (DBconnection con = new DBconnection())
            {
                var checkEmail = con.Employee.FirstOrDefault(e => e.email == employee.email);
                var checkEmpCode = con.Employee.FirstOrDefault(e => e.emp_code == employee.emp_code);
                if (checkEmail != null || checkEmpCode != null)
                {
                    return null;
                }
                var result =con.Employee.Add(employee);

                con.SaveChanges();
                return result;
            }

        }
      */



        /*  public Employee AddEmployee(Employee employee)
          {
              var checkEmail = this._context.employee.FirstOrDefault(e => e.email == employee.email);
          
              if (checkEmail != null)
              {
                  return null;
              }
              var result =con.Employee.Add(employee);

              con.SaveChanges();
              return result;
          }
        */
        [HttpGet]
        public HttpResponseMessage ReadAllDataById(int id)
        {
            using (DBconnection con = new DBconnection())
            {
                var res = con.Employee.FirstOrDefault(e => e.id == id);

                if (res != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, res);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Employee with Id = " + id.ToString() + " Not Found");
                }
            }

        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody] Employee emp)  // create
        {
            using (DBconnection con = new DBconnection())
            {
                con.Employee.Add(emp);
                con.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.Created, emp);
            }
        }

        /* 
          public void Delete(int id)
         {
             using (DBconnection con = new DBconnection())
             {

                 con.Employee.Remove(con.Employee.FirstOrDefault(e1=> e1.ID==id));
                 con.SaveChanges();
             }
         }

        */

        public HttpResponseMessage Delete(int id)
        {
            using (DBconnection con = new DBconnection())
            {
                var res = con.Employee.FirstOrDefault(e1 => e1.id == id);

                if (res == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Employee with Id = " + id.ToString() + " Not Found to Delete");
                }
                else
                {

                    con.Employee.Remove(res);
                    con.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
        }

        /*
         public void Put(int id,[FromBody] Employee emp)
          {
              using (DBconnection con = new DBconnection())
              {
                  var res = con.Employee.FirstOrDefault(e1 => e1.id == id);
                  res.ID = emp.ID;
                  res.emp_code = emp.emp_code;
                  res.Name = emp.Name;
                  res.Email = emp.Email;
                  res.designation = emp.designation;
                  res.join_date = emp.join_date;
                  res.padd1 = emp.padd1;
                  res.padd2 = emp.padd2;
                  res.cadd1 = emp.cadd1;
                  res.cadd2 = emp.cadd2;
                  con.SaveChanges();
              }
          }
        */
        public HttpResponseMessage Put(int id, [FromBody] Employee emp)
        {
            using (DBconnection con = new DBconnection())
            {
                var res = con.Employee.FirstOrDefault(e1 => e1.id == id);
                if (res != null)
                {
                    res.emp_code = emp.emp_code;
                    res.name = emp.name;
                    res.email = emp.email;
                    res.designation = emp.designation;
                    res.join_date = emp.join_date;
                    res.padd1 = emp.padd1;
                    res.padd2 = emp.padd2;
                    res.cadd1 = emp.cadd1;
                    res.cadd2 = emp.cadd2;
                    con.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, res);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Employee with Id = " + id.ToString() + " Not Found to Update");
                }
            }
        }
    }
}