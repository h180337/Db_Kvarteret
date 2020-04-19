using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Card
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public Guid UserId { get; set; }

            public string KortNummer { get; set; }

            public DateTime Opprettet { get; set; }
        }

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
            private readonly IuserAccessor _userAccessor;

            public Handler(DataContext context, IuserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var card = new Domain.Card
                {
                    KortNummer = request.KortNummer,
                    Opprettet = request.Opprettet
                };
                _context.Cards.Add(card);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName ==
                                                                          _userAccessor.GetCurrentUsername());
               

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}