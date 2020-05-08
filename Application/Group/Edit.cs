using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Group
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string navn { get; set; }
            public string beskrivelse { get; set; }
            public string aktiv { get; set; }
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
                var group = await _context.Groups.FindAsync(request.Id);

                if (group == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { group = "Not found" });
                }

                group.navn = request.navn ?? group.navn;
                group.beskrivelse = request.beskrivelse ?? group.beskrivelse;
                group.aktiv = request.aktiv ?? group.aktiv;
                // group.aktiv = request.aktiv ??  group.aktiv;
                // group.aktiv_til_og_med = request.aktiv_til_og_med  group.aktiv_til_og_med;

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