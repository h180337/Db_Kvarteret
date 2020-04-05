using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Card;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Card>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}