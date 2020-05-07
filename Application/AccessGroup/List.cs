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
        public class Query : IRequest<List<AccessGroupDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<AccessGroupDto>>

        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<AccessGroupDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var accessgroups = await _context.Roles.ToListAsync();
                var list = new List<AccessGroupDto>();

                foreach (var accessgroup in accessgroups)
                {
                    list.Add(_mapper.Map<Domain.AccessGroup, AccessGroupDto>(accessgroup));
                }
                return list;
            }
        }
    }
}