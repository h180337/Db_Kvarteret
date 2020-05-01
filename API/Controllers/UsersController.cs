using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Group;
using Application.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using List = Application.User.List;

namespace API.Controllers
{
    public class UsersController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost("createuser")]
        public async Task<ActionResult<Unit>> createUser(CreateUser.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> Profile(string id)
        {
            return await Mediator.Send(new UserProfile.Query { Id = id });
        }

        [HttpGet("user")]
        public async Task<ActionResult<UserDto>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }

        [HttpGet("{id}/grouphistory")]
        public async Task<ActionResult<List<GroupDto>>> GroupHistory(string Id)
        {
            return await Mediator.Send(new GroupHistory.Query { id = Id });
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(string id, EditUser.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new DeleteUser.Command { Id = id });
        }
    }
}