using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Shop_AccLOL.Controllers
{
    public class TopCardPartialController : Controller
    {
        // GET: TopCardPartial
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult TopCard()
        {
            return PartialView();
        }

    }
}