using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Organisation
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string name { get; set; }
            public string description { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.name).NotEmpty();
                RuleFor(x => x.description).NotEmpty();
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
                var organisation = await _context.Organisations.FindAsync(request.Id);

                if (organisation == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { personel = "Not found" });
                }

                organisation.name = request.name ?? organisation.name;
                organisation.description = request.description ?? organisation.description;

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