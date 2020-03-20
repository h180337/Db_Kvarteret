using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class CreateUser
    {
        public class Command : IRequest
        {
            public string fornavn { get; set; }

            public string etternavn { get; set; }

            public string phoneNumber { get; set; }

            public string userName { get; set; }

            public string kjonn { get; set; }

            public string Email { get; set; }

            public string Password { get; set; }

            public string workstatus { get; set; }

            public DateTime created { get; set; }

            public DateTime dateOfBirth { get; set; }

            public string streetAddress { get; set; }

            public string areaCode { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.fornavn).NotEmpty();
                RuleFor(x => x.etternavn).NotEmpty();
                RuleFor(x => x.kjonn).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.phoneNumber).NotEmpty();
                RuleFor(x => x.streetAddress).NotEmpty();
                RuleFor(x => x.areaCode).NotEmpty();
                RuleFor(x => x.userName).NotEmpty();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command>

        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _context = context;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = "Email already exist"});
                }

                if (await _context.Users.Where(x => x.UserName == request.userName).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {Username = "Username already exist"});
                }

                var user = new AppUser
                {
                    fornavn = request.fornavn,
                    etternavn = request.etternavn,
                    PhoneNumber = request.phoneNumber,
                    UserName = request.userName,
                    kjonn = request.kjonn,
                    Email = request.Email,
                    areaCode = request.areaCode,
                    streetAddress = request.streetAddress,
                    created = request.created,
                    dateOfBirth = request.dateOfBirth,
                    workstatus = request.workstatus,
                    
                };

                var results = await _userManager.CreateAsync(user, request.Password);
                if (results.Succeeded)
                {
                    return Unit.Value;
                }

                throw new Exception("problem creating user");
            }
        }
    }
}