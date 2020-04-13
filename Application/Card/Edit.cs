using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Card
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            
            public Guid UserId {get; set;}

            public string KortNummer { get; set; }

            public DateTime Opprettet { get; set; }
        }

        //FormValidation
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.KortNummer).NotEmpty();
                RuleFor(x => x.Opprettet).NotEmpty();
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
                var card = await _context.Cards.FindAsync(request.Id);

                if (card == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { card = "Not found" });
                }

                card.UserId = request.UserId;
                card.KortNummer = request.KortNummer ?? card.KortNummer;
                card.Opprettet = card.Opprettet;

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