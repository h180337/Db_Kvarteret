using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class EditUser
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string fornavn { get; set; }
            public string etternavn { get; set; }
            public string workstatus { get; set; }
            public string kjonn { get; set; }
            public string email { get; set; }
            public string phoneNumber { get; set; }
            public string streetAddress { get; set; }
            public string areaCode { get; set; }

        }

        //FormValidation
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.fornavn).NotEmpty();
                RuleFor(x => x.etternavn).NotEmpty();
                RuleFor(x => x.workstatus).NotEmpty();
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
                var user = await _context.Users.FindAsync(request.Id);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { personel = "Not found" });
                }

                user.fornavn = request.fornavn ?? user.fornavn;
                user.etternavn = request.etternavn ?? user.etternavn;
                user.kjonn = request.kjonn ?? user.kjonn;
                user.Email = request.email ?? user.Email;
                user.workstatus = request.workstatus ?? user.workstatus;
                user.PhoneNumber = request.phoneNumber ?? user.PhoneNumber;
                user.streetAddress = request.streetAddress ?? user.streetAddress;
                user.areaCode = request.areaCode ?? user.areaCode;

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