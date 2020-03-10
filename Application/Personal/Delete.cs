using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Personal
{
    public class Delete
    {
        public class Command : IRequest //<//>>
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

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var personel = await _context.Personal.FindAsync(request.Id);

                if (personel == null)
                {
                    throw new Exception("Could not find a Person");
                }

                _context.Remove(personel);
                
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