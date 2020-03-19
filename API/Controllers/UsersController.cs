using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using List = Application.User.List;

namespace API.Controllers
{
    public class UsersController: BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost("createuser")]
        public async Task<ActionResult<Unit>> createUser(CreateUser.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Profile(Guid id)
        {
            return await Mediator.Send(new UserProfile.Query {Id = id});
        }

        [HttpGet("user")]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }


        [HttpGet]
        public async Task<ActionResult<List<User>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id ,EditUser.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
        
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new DeleteUser.Command {Id = id});
        }
    }
}