using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Personal
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string fornavn { get; set; }

            public string etternavn { get; set; }

            public string brukerkonto { get; set; }

            public string kjonn { get; set; }

            public string epost { get; set; }

            public string telefon { get; set; }

            public string arb_status { get; set; }

            public DateTime opprettet { get; set; }

            public DateTime fodselsdato { get; set; }

            public string gateadresse { get; set; }

            public string postnummerid { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.fornavn).NotEmpty();
                RuleFor(x => x.etternavn).NotEmpty();
                RuleFor(x => x.brukerkonto).NotEmpty();
                RuleFor(x => x.kjonn).NotEmpty();
                RuleFor(x => x.epost).NotEmpty();
                RuleFor(x => x.telefon).NotEmpty();
                RuleFor(x => x.arb_status).NotEmpty();
                RuleFor(x => x.opprettet).NotEmpty();
                RuleFor(x => x.fodselsdato).NotEmpty();
                RuleFor(x => x.gateadresse).NotEmpty();
                RuleFor(x => x.postnummerid).NotEmpty();

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
                var personel = new Domain.Personal
                {
                    Id = request.Id,
                    fornavn = request.fornavn,
                    etternavn = request.etternavn,
                    brukerkonto = request.brukerkonto,
                    kjonn = request.kjonn,
                    epost = request.epost,
                    telefon = request.telefon,
                    arb_status = request.arb_status,
                    opprettet = request.opprettet,
                    fodselsdato = request.fodselsdato,
                    gateadresse = request.gateadresse,
                    postnummerid = request.postnummerid
                };
                _context.Personal.Add(personel);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                
                throw new Exception("Problem saving changes");
            }
        }
    }
}