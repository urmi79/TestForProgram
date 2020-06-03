using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ExcelUpload.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http;
using ExcelUpload.Models;
using MySql.Data.MySqlClient;
using Google.Protobuf.WellKnownTypes;
using System.Web.Http;

namespace ExcelUpload.Controllers
{
    public class ExcelUploadController :ApiController

    {       
      
        
        
        public IEnumerable<excelupload> GetExcelUpload()
        {
            string str = "Server=localhost;Database=excelupload;Uid=homepc;Pwd=Welcome@1234;";
            exceluploadcontext context = new exceluploadcontext(str);
            return context.GetAllexcelupload();
        }
    }
}
