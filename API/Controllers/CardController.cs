using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Card;
using Domain;
using MediatR;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> Profile(Guid id)
        {
            return await Mediator.Send(new Application.Card.Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}