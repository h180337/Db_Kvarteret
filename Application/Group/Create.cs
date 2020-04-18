using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
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

            public string aktiv { get; set; }

            public string groupType { get; set; }

            public DateTime aktiv_til_og_med { get; set; }

            public DateTime opprettet { get; set; }
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
                RuleFor(x => x.groupType).NotEmpty();

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
                var group = new Domain.Group
                {
                    Id = request.Id,
                    navn = request.navn,
                    beskrivelse = request.beskrivelse,
                    aktiv = request.aktiv,
                    aktiv_til_og_med = request.aktiv_til_og_med,
                    opprettet = request.opprettet,
                    groupType = request.groupType
                };
                _context.Groups.Add(group);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName ==
                                                                          _userAccessor.GetCurrentUsername());

                var admin = new UserGroup
                {
                    AppUser = user,
                    Group = group,
                    GroupAdmin = true,
                    DateJoined = DateTime.Now
                };

                _context.UserGroups.Add(admin);
                

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}