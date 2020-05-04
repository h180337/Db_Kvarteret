using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AccessGroup
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Name { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>

        {
            private readonly DataContext _context;
            private readonly RoleManager<Domain.AccessGroup> _roleManager;

            public Handler(DataContext context, RoleManager<Domain.AccessGroup> roleManager)
            {
                _context = context;
                _roleManager = roleManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                if (await _context.Roles.Where(x => x.Name == request.Name).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { RoleName = "Rolename already exists" });
                }

                var role = new Domain.AccessGroup
                {
                    Name = request.Name,
                };

                var results = await _roleManager.CreateAsync(role);
                if (results.Succeeded)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem creating user");
            }
        }
    }
}