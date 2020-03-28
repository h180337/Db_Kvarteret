using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Course;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CourseController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Course>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> Profile(Guid id)
        {
            return await Mediator.Send(new Application.Course.Details.Query {Id = id});
        }
    }
}