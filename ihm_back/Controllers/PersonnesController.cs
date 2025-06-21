using Back_IHM.DataContext;
using Microsoft.AspNetCore.Mvc;

namespace Back_IHM.Controllers
{
    public class PersonnesController : ControllerBase
    {
        private readonly IhmDBContext _context;
        public PersonnesController(IhmDBContext context) {  _context = context; }

    }
}
