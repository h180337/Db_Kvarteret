using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tags
{
    public class List
    {
        public class Query : IRequest<List<Domain.Tags>>
        {
        }

        public class Handler : IRequestHandler<Query, List<Domain.Tags>>

        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Tags>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tags = await _context.Tags.ToListAsync();
                return tags;
            }
        }
    }
}