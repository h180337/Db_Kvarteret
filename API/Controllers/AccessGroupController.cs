using System.Collections.Generic;
using System.Threading.Tasks;
using Application.AccessGroup;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccessGroupController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Domain.AccessGroup>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        
    }
}