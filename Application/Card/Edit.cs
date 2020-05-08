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
            public string UserId { get; set; }
            public string CardNumber { get; set; }
            public DateTime Created { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.CardNumber).NotEmpty();
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

                card.CardNumber = request.CardNumber ?? card.CardNumber;

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