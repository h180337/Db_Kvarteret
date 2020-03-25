using System.Collections.Generic;
using System.Threading;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Group
{
    public class List
    {
        public class Query : IRequest<List<Domain.Group>>
        {
        }

        public class Handler : IRequestHandler<Query, List<Domain.Group>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async System.Threading.Tasks.Task<List<Domain.Group>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var groups = await _context.Groups
                    .Include(x => x.UserGroups)
                    .ThenInclude(x => x.AppUser)
                    .ToListAsync();

                return groups;
            }
        }
    }
}