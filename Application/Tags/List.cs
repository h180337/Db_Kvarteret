using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tags
{
    public class List
    {
        public class Query : IRequest<List<TagsDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<TagsDto>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<TagsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tags = await _context.Tags.ToListAsync();
               
                return _mapper.Map<List<Domain.Tags>, List<TagsDto>>(tags);
            }
        }
    }
}