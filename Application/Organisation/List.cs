using System.Collections.Generic;
 using System.Threading;
 using System.Threading.Tasks;
using AutoMapper;
using MediatR;
 using Microsoft.EntityFrameworkCore;
 using Persistence;
 
namespace Application.Organisation
 {
     public class List
     {
         public class Query : IRequest<List<OrganisationDto>>
         {
         }
 
         public class Handler : IRequestHandler<Query, List<OrganisationDto>>
         
         {
             private readonly DataContext _context;
             private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<OrganisationDto>> Handle(Query request, CancellationToken cancellationToken)
             {
                 var organisations = await _context.Organisations.ToListAsync();
                 return _mapper.Map<List<Domain.Organisation>, List<OrganisationDto>>(organisations) ;
             }
         }
     }
 }