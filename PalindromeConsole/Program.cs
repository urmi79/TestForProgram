using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;


namespace PalindromeConsole
{
    class Program
    {

        static void Main(string[] args)
        {
            string strPalin;
            List<string> ListPalin = new List<string>();
            //Enter a string from console.
            Console.WriteLine("Enter your a string: ");
            //Read the entered string and display
            strPalin = Console.ReadLine();
            Console.WriteLine("String for check: " + strPalin);
            Console.ReadLine();
            //Split the string and form list of words using whitespace and comma
            ListPalin = new List<string>(strPalin.Trim().Split(new char[] { ' ', ',' }));
            //Iterate through the List and check for palindrome word.
            for (int i = 0; i < ListPalin.Count; i++)
            {
                var reversed = new string(ListPalin[i].Reverse().ToArray());

                if (ListPalin[i] == reversed)
                {
                    Console.WriteLine(ListPalin[i].ToString() + "-------Palindrome");
                    Console.ReadLine();
                }

            }

        }
     }
}



    
    

