using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Organisation;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrganisationController: BaseController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<OrganisationDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrganisationDto>> Profile(Guid id)
        {
            return await Mediator.Send(new Details.Query {Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
        
        [HttpPost("{OrganisationId}/addGroupToOrganisation/{groupId}")]
        public async Task<ActionResult<Unit>> AddGroupToOrganisation(Guid OrganisationId, Guid GroupId)
        {
            return await Mediator.Send(new AddGroupToOrganisation.Command { OrganisationId = OrganisationId, GroupId = GroupId });
        }
        
        [HttpDelete("{organisationId}/remove/{groupId}")]
        //[Authorize(Policy = "isAdmin")]
        public async Task<ActionResult<Unit>> RemoveGroup(Guid organisationId, Guid groupId)
        {
            return await Mediator.Send(new removeGroupFromOrganisation.Command { OrganisationId = organisationId, GroupId = groupId });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id ,Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command {Id = id});
        }

        [HttpPost("{organisationId}/AddAdmin/{userId}")]
        public async Task<ActionResult<Unit>> AddAdmin(Guid organisationId, string userId)
        {
            return await Mediator.Send(new AddAdmin.Command { OrganisationId = organisationId, UserId = userId });
        }
    }
}