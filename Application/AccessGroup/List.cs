using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AccessGroup
{
    public class List
    {
        public class Query : IRequest<List<Domain.AccessGroup>>
        {
        }

        public class Handler : IRequestHandler<Query, List<Domain.AccessGroup>>

        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<Domain.AccessGroup>> Handle(Query request, CancellationToken cancellationToken)
            {
                var accessGroups = await _context.AccessGroups.ToListAsync();
                
                return accessGroups;
            }
        }
    }
}