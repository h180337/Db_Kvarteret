using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dependent;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DependentController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<DependentDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid Id)
        {
            return await Mediator.Send(new Delete.Command {Id = Id});
        }
    }
}