using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AzureAuthDemo.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    
        //[Authorize(Policy = "CanAccessVIPArea")]
        [Authorize]
        public IActionResult About()
        {
            
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
           
            ViewData["Message"] = "NA";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public IActionResult AccessDenied(){
            ViewData["Message"] = "Access Denied!";
            return View();
        }
    }
}
