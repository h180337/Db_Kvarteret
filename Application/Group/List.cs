using System.Collections.Generic;
using System.Threading;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Group
{
    public class List
    {
        public class Query : IRequest<List<GroupDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<GroupDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async System.Threading.Tasks.Task<List<GroupDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var groups = await _context.Groups.ToListAsync();

                return _mapper.Map<List<Domain.Group>, List<GroupDto>>(groups);
            }
        }
    }
}