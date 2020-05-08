using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
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
            public string UserId { get; set; }
            public string CardNumber { get; set; }
            public DateTime Created { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CardNumber).NotEmpty();
                RuleFor(x => x.Created).NotEmpty();
                RuleFor(x => x.UserId).NotEmpty();
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
                var user = await _context.Users.FindAsync(request.UserId);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Not found" });
                }

                var card = new Domain.Card
                {
                    AppUser = user,
                    CardNumber = request.CardNumber,
                    Created = DateTime.Now
                };

                _context.Cards.Add(card);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}