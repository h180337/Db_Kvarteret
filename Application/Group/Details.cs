using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Group
{
    public class Details
    {
        public class Query : IRequest<GroupDto>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, GroupDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _context = dataContext;
                _mapper = mapper;
            }
            public async Task<GroupDto> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var group = await _context.Groups.FindAsync(request.Id);

                if (group == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { group = "Not found" });
                }

                var groupToReturn = _mapper.Map<Domain.Group, GroupDto>(group);

                return groupToReturn;

            }
        }
    }
}