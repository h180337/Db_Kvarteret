using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dependent
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Name { get; set; }

            public string Telephone { get; set; }

            public string AppUserId { get; set; }

            public DateTime Created { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Telephone).NotEmpty();
                RuleFor(x => x.AppUserId).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context, IuserAccessor userAccessor)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.AppUserId);
                
                var dependent = new Domain.Dependent
                {
                    AppUser = user,
                    Name = request.Name,
                    Telephone = request.Telephone,
                    Created = DateTime.Now
                };

                _context.Dependents.Add(dependent);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}