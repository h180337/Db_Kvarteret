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
        public async Task<ActionResult<List<AccessGroupDto>>> List()
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

        [HttpPost("{roleid}/removeFromUser/{userid}")]
        public async Task<ActionResult<Unit>> RemoveFromUser(string roleid, string userid)
        {
            return await Mediator.Send(new RemoveFromUser.Command { RoleId = roleid, UserId = userid });
        }

        [HttpGet("getRoles/{userid}")]
        public async Task<ActionResult<List<AccessGroupDto>>> GetRoles(string userid)
        {
            return await Mediator.Send(new UserRoles.Query { UserId = userid });
        }

        
    }
}