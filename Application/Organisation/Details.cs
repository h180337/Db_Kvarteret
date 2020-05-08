using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Organisation;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Organisation
{
    public class Details
    {
        public class Query : IRequest<OrganisationDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, OrganisationDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<OrganisationDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var organisation = await _context.Organisations.FindAsync(request.Id);

                if (organisation == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { organisation = "Not found" });
                }

                var organisationToReturn = _mapper.Map<Domain.Organisation, OrganisationDto>(organisation);
                return organisationToReturn;
            }
        }
    }
}