using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Dependent
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Telephone { get; set; }
            public string AppUserId { get; set; }
        }

        //FormValidation
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
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
                var dependent = await _context.Dependents.FindAsync(request.Id);

                if (dependent == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { dependent = "Not found" });
                }

                dependent.Name = request.Name ?? dependent.Name;
                dependent.Telephone = request.Telephone ?? dependent.Telephone;

                if (request.AppUserId != dependent.AppUser.Id)
                {
                    var newUser = await _context.Users.FindAsync(request.AppUserId);
                    if (newUser == null)
                    {
                        throw new RestException(HttpStatusCode.NotFound, new { dependent = "New AppUser not found" });
                    }
                    dependent.AppUser = newUser;
                }
                
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