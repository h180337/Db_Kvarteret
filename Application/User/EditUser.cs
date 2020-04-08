using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.User
{
    public class EditUser
    {
        public class Command : IRequest //<//>>
        {
            public Guid Id { get; set; }

            public string fornavn { get; set; }

            public string etternavn { get; set; }
            
            public string userName { get; set; }

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
                RuleFor(x => x.kjonn).NotEmpty();
                RuleFor(x => x.email).NotEmpty();
                RuleFor(x => x.phoneNumber).NotEmpty();
                RuleFor(x => x.streetAddress).NotEmpty();
                RuleFor(x => x.areaCode).NotEmpty();
                RuleFor(x => x.userName).NotEmpty();


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
                var user = await _context.Users.FindAsync(request.Id.ToString());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {personel = "Not found"});
                }

                user.fornavn = request.fornavn ?? user.fornavn;
                user.etternavn = request.etternavn ?? user.etternavn;
                user.kjonn = request.kjonn ?? user.kjonn;
                user.Email = request.email ?? user.Email;
                user.PhoneNumber = request.phoneNumber ?? user.PhoneNumber;
                user.streetAddress = request.streetAddress ?? user.streetAddress;
                user.areaCode = request.areaCode ?? user.areaCode;
                user.UserName = request.userName ?? user.UserName;
                
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