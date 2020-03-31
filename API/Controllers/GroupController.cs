using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Group;
using MediatR;
using Microsoft.AspNetCore.Mvc;

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
            return await Mediator.Send(new Application.Group.Details.Query {Id = id});
        }


        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("{id}/addGroupMember/{userid}")]
        public async Task<ActionResult<Unit>> AddGroupMember(Guid id, Guid userid)
        {
            return await Mediator.Send(new AddtoGroup.Command {GroupId = id, UserId = userid});
        }

        [HttpDelete("{id}/remove/{userid}")]
        public async Task<ActionResult<Unit>> RemoveMember(Guid id, Guid userId)
        {
            return await Mediator.Send(new RemoveFromGroup.Command{GroupId = id, UserId = userId});
        }
    }
}