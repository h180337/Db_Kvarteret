using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Group
{
    public class Create
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }

        public string navn { get; set; }
        
        public string beskrivelse { get; set; }
        
        public int aktiv { get; set; }
        
        public int aktiv_til_og_med { get; set; }
        
        public int opprettet { get; set; }
             
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() 
            {
                RuleFor(x => x.navn).NotEmpty();
                RuleFor(x => x.beskrivelse).NotEmpty();
                RuleFor(x => x.aktiv).NotEmpty();
                RuleFor(x => x.aktiv_til_og_med).NotEmpty();
                RuleFor(x => x.opprettet).NotEmpty();
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
                var group = new Domain.Group
                {
                    Id = request.Id,
                    navn = request.navn,
                    beskrivelse = request.beskrivelse,
                    aktiv = request.aktiv,
                    aktiv_til_og_med = request.aktiv_til_og_med,
                    opprettet = request.opprettet
                    
                };
                _context.Groups.Add(group);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                
                throw new Exception("Problem saving changes");
            }
        }
    }
}