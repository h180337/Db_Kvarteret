using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
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
                
                if (personel == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {personel = "Not found"});
                }
                return personel;
            }
        }
    }
}