using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Tags;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TagController : BaseController

    {
        [HttpGet]
        public async Task<ActionResult<List<Tags>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command {Id = id});
        }
    }
}