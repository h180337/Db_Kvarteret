using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Organisation
{
    public class Create
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
                var organisation = new Domain.Organisation
                {
                    Id = request.Id,
                    name = request.name,
                    description = request.description,
                    
                };
                _context.Organisations.Add(organisation);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                
                throw new Exception("Problem saving changes");
            }
        }
    }
}