using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Group
{
    public class Details
    {
        public class Query : IRequest<Domain.Group>
        {
            public Guid Id {get; set;}
        }
        public class Handler : IRequestHandler<Query, Domain.Group>
        {
            private readonly DataContext _context;

            public Handler(DataContext dataContext) {
                _context = dataContext;
            }
            public async Task<Domain.Group> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var group = await _context.Groups.FindAsync(request.Id);

                
                if (group == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {group = "Not found"});
                }
                return group;
            }
        }
    }
}