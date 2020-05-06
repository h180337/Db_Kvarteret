using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Course
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string navn { get; set; }

            public string beskrivelse { get; set; }

            public int opprettet { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.navn).NotEmpty();
                RuleFor(x => x.beskrivelse).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IuserAccessor _userAccessor;

            public Handler(DataContext context, IuserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var course = new Domain.Course
                {
                    navn = request.navn,
                    beskrivelse = request.beskrivelse,
                };
                _context.Courses.Add(course);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName ==
                                                                          _userAccessor.GetCurrentUsername());
                /*var admin = new UserCourse
                {
                    AppUser = user,
                    Course = course,
                    CourseAdmin = true,
                    DateJoined = DateTime.Now
                };

                _context.UserCourses.Add(admin);*/

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}