using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            private readonly IuserAccessor _userAccessor;

            public Handler(DataContext context,
                IuserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
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
                
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName ==
                                                                          _userAccessor.GetCurrentUsername());
                
                var admin = new UserOrganisationAdmin
                {
                    AppUser = user,
                    Organisation = organisation,
                    orgAdmin = true
                };

                _context.UserOrganisationAdmins.Add(admin);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                
                throw new Exception("Problem saving changes");
            }
        }
    }
}