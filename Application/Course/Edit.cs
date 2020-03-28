using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Course
{
    public class Edit
    {
                public class Command : IRequest 
        {
            public Guid Id { get; set; }

            public string navn { get; set; }

            public string beskrivelse { get; set; }
        }

        //FormValidation
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

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var course = await _context.Courses.FindAsync(request.Id);

                if (course == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {course = "Not found"});
                }

                course.navn = request.navn ?? course.navn;
                course.beskrivelse = request.beskrivelse ?? course.beskrivelse;

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