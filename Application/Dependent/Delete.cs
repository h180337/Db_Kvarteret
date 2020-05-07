using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Dependent
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>

        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request,
            CancellationToken cancellationToken)
            {
                var dependent = await _context.Dependents.FindAsync(request.Id);

                if (dependent == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { dependent = "Not found" });
                }

                _context.Remove(dependent);

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