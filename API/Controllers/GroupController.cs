using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Group;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace API.Controllers
{
    public class GroupController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<GroupDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupDto>> Profile(Guid id)
        {
            return await Mediator.Send(new Application.Group.Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("{id}/addGroupMember/{userid}")]
        //[Authorize(Policy = "isAdmin")]
        public async Task<ActionResult<Unit>> AddGroupMember(Guid id, string userid)
        {
            return await Mediator.Send(new AddtoGroup.Command { GroupId = id, UserId = userid });
        }

        [HttpPut("{id}")]
        //[Authorize(Policy = "isAdmin")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }


        [HttpDelete("{id}/remove/{userid}")]
        //[Authorize(Policy = "isAdmin")]
        public async Task<ActionResult<Unit>> RemoveMember(Guid id, string userId)
        {
            return await Mediator.Send(new RemoveFromGroup.Command { GroupId = id, UserId = userId });
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command {Id = id});
        }
        
        [HttpPut("{groupId}/editadmin/{userId}")]
        //[Authorize(Policy = "isAdmin")]
        public async Task<ActionResult<Unit>> EditAdmin(Guid groupId, string userId, EditAdmin.Command command)
        {
            command.GroupId = groupId;
            command.UserId = userId;
            return await Mediator.Send(command);
        }
    }
    
}