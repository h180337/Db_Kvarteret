using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Course
{
    public class AddToCourse
    {
        public class Command : IRequest
        {
            public Guid UserId { get; set; }
            public Guid CourseId { get; set; }

        }

        public class Handler : IRequestHandler<Command>

        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var course = await _context.Courses.FindAsync(request.CourseId);

                if (course == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { course = " could not find course" });
                }

                var user = await _context.Users.FindAsync(request.UserId.ToString());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = " could not find user" });
                }

                var members =
                    await _context.UserCourses.SingleOrDefaultAsync(x =>
                        x.CourseId == course.Id && x.AppUserId == user.Id);

                if (members != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Members = "already member of this course" });
                }

                members = new UserCourse
                {
                    Course = course,
                    AppUser = user,
                    DateJoined = DateTime.Now
                };

                _context.UserCourses.Add(members);

                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("problem saving changes");
            }
        }
    }
}