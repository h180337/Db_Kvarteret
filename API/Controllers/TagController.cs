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
        public async Task<ActionResult<List<TagsDto>>> List()
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

        [HttpPost("{id}/add/{userid}")]
        public async Task<ActionResult<Unit>> AddTagMember(Guid id, string userid)
        {
            return await Mediator.Send(new AddMember.Command { TagId = id, UserId = userid });
        }

        [HttpDelete("{id}/remove/{userid}")]
        public async Task<ActionResult<Unit>> RemoveTagMember(Guid id, string userid)
        {
            return await Mediator.Send(new RemoveMember.Command { TagId = id, UserId = userid });
        }
    }
}