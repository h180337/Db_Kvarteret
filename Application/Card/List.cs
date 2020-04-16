using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Card
{
    public class List
    {
        public class Query : IRequest<List<CardDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<CardDto>>

        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<CardDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var cards = await _context.Cards.ToListAsync();
                var list = new List<CardDto>();

                foreach(var card in cards) {
                    list.Add(_mapper.Map<Domain.Card, CardDto>(card));
                }
                return list;
            }
        }
    }
}