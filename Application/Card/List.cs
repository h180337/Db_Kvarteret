using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Card
{
    public class List
    {
        public class Query : IRequest<List<Domain.Card>>
        {
        }

        public class Handler : IRequestHandler<Query, List<Domain.Card>>

        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Card>> Handle(Query request, CancellationToken cancellationToken)
            {
                var cards = await _context.Cards.ToListAsync();
                return cards;
            }
        }
    }
}