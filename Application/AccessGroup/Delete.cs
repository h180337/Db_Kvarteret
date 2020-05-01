using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.AccessGroup
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
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
                var role = await _context.Roles.FindAsync(request.Id);

                if (role == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { role = "Not found" });
                }

                _context.Remove(role);

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