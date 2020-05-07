using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dependent
{
    public class List
    {
        public class Query : IRequest<List<DependentDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<DependentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<DependentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var dependent = await _context.Dependents.ToListAsync();
                
                return _mapper.Map<List<Domain.Dependent>, List<DependentDto>>(dependent);
            }
        }
    }
}