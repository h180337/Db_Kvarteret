using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Personal
{
    public class Edit
    {
        public class Command : IRequest //<//>>
        {
            public Guid Id { get; set; }

            public string fornavn { get; set; }

            public string etternavn { get; set; }
            

            public string kjonn { get; set; }

            public string epost { get; set; }

            public string telefon { get; set; }
            
            public string gateadresse { get; set; }

            public string postnummerid { get; set; }
        }

        //FormValidation
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.fornavn).NotEmpty();
                RuleFor(x => x.etternavn).NotEmpty();
                RuleFor(x => x.kjonn).NotEmpty();
                RuleFor(x => x.epost).NotEmpty();
                RuleFor(x => x.telefon).NotEmpty();
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
                var personael = await _context.Personal.FindAsync(request.Id);

                if (personael == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {personel = "Not found"});
                }

                personael.fornavn = request.fornavn ?? personael.fornavn;
                personael.etternavn = request.etternavn ?? personael.etternavn;
                personael.kjonn = request.fornavn ?? personael.kjonn;
                personael.epost = request.epost ?? personael.epost;
                personael.telefon = request.telefon ?? personael.telefon;
                personael.gateadresse = request.gateadresse ?? personael.gateadresse;
                personael.postnummerid = request.postnummerid ?? personael.postnummerid;
                personael.kjonn = request.kjonn ?? personael.kjonn;

                
                
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