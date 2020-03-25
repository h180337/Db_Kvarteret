using System;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> Profile(Guid id)
        {
            return await Mediator.Send(new Application.Group.Details.Query {Id = id});
        }
    }
}