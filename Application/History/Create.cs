using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.History
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string GroupName { get; set; }
            public string Position { get; set; }
            public string GroupType { get; set; }
            public int Year { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.GroupName).NotEmpty();
                RuleFor(x => x.Position).NotEmpty();
                RuleFor(x => x.GroupType).NotEmpty();
                RuleFor(x => x.Year).NotEmpty();
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
                var history = new Domain.History
                {
                    GroupName = request.GroupName,
                    Position = request.Position,
                    GroupType = request.GroupType,
                    Year = request.Year
                };

                _context.Historys.Add(history);

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
