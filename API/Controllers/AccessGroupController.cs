using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.AccessGroup;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("create")]
        public async Task<ActionResult<Unit>> CreateRole(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPost("{roleid}/addToUser/{userid}")]
        public async Task<ActionResult<Unit>> AddToUser(string roleid, string userid)
        {
            return await Mediator.Send(new AddToUser.Command { RoleId = roleid, UserId = userid });
        }

        
    }
}