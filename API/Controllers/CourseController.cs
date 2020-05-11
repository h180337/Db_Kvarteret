using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Course;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CourseController : BaseController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<CourseDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> Profile(Guid id)
        {
            return await Mediator.Send(new Application.Course.Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("{courseId}/addCourseMember/{userid}")]
        public async Task<ActionResult<Unit>> AddCourseMember(Guid courseId, string userid)
        {
            return await Mediator.Send(new AddToCourse.Command { CourseId = courseId, UserId = userid });
        }

        [HttpPost("{courseId}/removeCourseMember/{userid}")]
        public async Task<ActionResult<Unit>> RemoveCourseMember(Guid courseId, string userid)
        {
            return await Mediator.Send(new RemoveFromCourse.Command { CourseId = courseId, UserId = userid });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command {Id = id});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPost("{courseId}/editAdmin/{userid}")]
        public async Task<ActionResult<Unit>> EditAdmin(Guid courseId, string userid)
        {
            return await Mediator.Send(new EditAdmin.Command { CourseId = courseId, UserId = userid });
        }
    }
}