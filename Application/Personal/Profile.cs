using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Personal
{
    public class Profile
    {
        public class Query : IRequest<Domain.Personal>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Domain.Personal>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Domain.Personal> Handle(Query request, CancellationToken cancellationToken)
            {
                var personel = await _context.Personal.FindAsync(request.Id);
                return personel;
            }
        }
    }
}