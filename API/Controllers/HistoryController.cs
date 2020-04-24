using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.History;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HistoryController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<HistoryDto>>> List()
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
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPost("{id}/add/{userid}")]
        public async Task<ActionResult<Unit>> AddTagMember(Guid id, string userid)
        {
            return await Mediator.Send(new AddMember.Command { HistoryId = id, UserId = userid });
        }

        [HttpDelete("{id}/remove/{userid}")]
        public async Task<ActionResult<Unit>> RemoveTagMember(Guid id, string userid)
        {
            return await Mediator.Send(new RemoveMember.Command { HistoryId = id, UserId = userid });
        }
        [HttpPost("{id}/add/{userid}")]
        public async Task<ActionResult<Unit>> AddMember(Guid id, string userid)
        {
            return await Mediator.Send(new AddMember.Command { HistoryId = id, UserId = userid });
        }

        [HttpDelete("{id}/remove/{userid}")]
        public async Task<ActionResult<Unit>> RemoveMember(Guid id, string userid)
        {
            return await Mediator.Send(new RemoveMember.Command { HistoryId = id, UserId = userid });
        }
    }
}