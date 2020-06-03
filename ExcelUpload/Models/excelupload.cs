using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace ExcelUpload.Models

{
    public class excelupload
    {
            private exceluploadcontext Context;
            [Key]
        public int slno { get; set; }
        public string company { get; set; }
        public string sector { get; set; }
        public string subsector { get; set; }
        public string region { get; set; }
        public int noofemployees { get; set; }
        public int totalrevenues { get; set; }
        public string websites { get; set; }

    }
    }

