using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;

namespace Application.Card
{
    public class Details
    {
        public class Query : IRequest<Domain.Card>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Domain.Card>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _context = dataContext;
                _mapper = mapper;
            }
            public async Task<Domain.Card> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var card = await _context.Cards.FindAsync(request.Id);


                if (card == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { card = "Not found" });
                }

                return card;
            }
        }
    }
}