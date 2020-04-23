using System.Collections.Generic;
using System.Threading.Tasks;
using Application.History;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HistoryController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<HistoryDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}