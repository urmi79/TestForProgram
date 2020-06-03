using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace ExcelUpload.Models
{
   public class exceluploadcontext
    {
        public string ConnectionString { get; set; }
        public exceluploadcontext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<excelupload> GetAllexcelupload()
        {
            List<excelupload> list = new List<excelupload>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from Album where id < 10", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new excelupload()
                        {
                            
                             slno = Convert.ToInt32(reader["slno"]),
                            company = reader["company"].ToString(),
                            sector = reader["sector"].ToString(),
                            subsector = reader["subsector"].ToString(),
                            region = reader["region"].ToString(),
                            noofemployees = Convert.ToInt32(reader["noofemployees"]),
                            totalrevenues = Convert.ToInt32(reader["totalrevenues"]),
                           websites = reader["websites"].ToString()
                        });
                    }
                }
            }
            return list;
        }

    }
}

      