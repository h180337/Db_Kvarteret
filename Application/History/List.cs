using System.Collections.Generic;
using System.Threading;
using AutoMapper;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.History;

namespace Application.History
{
    public class List
    {
        public class Query : IRequest<List<HistoryDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<HistoryDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async System.Threading.Tasks.Task<List<HistoryDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var history = await _context.Historys.ToListAsync();

                return _mapper.Map<List<Domain.History>, List<HistoryDto>>(history);
            }
        }
    }
}