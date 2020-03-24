using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Personal
{
    public class Details
    {
        public class Query : IRequest<Domain.Organisation>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Domain.Organisation>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Domain.Organisation> Handle(Query request, CancellationToken cancellationToken)
            {
                var organisation = await _context.Organisations.FindAsync(request.Id);
                
                if (organisation == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {personel = "Not found"});
                }
                return organisation;
            }
        }
    }
}