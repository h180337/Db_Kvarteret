using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Group;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GroupController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Group>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}