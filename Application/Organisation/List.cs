using System.Collections.Generic;
 using System.Threading;
 using System.Threading.Tasks;
 using MediatR;
 using Microsoft.EntityFrameworkCore;
 using Persistence;
 
namespace Application.Organisation
 {
     public class List
     {
         public class Query : IRequest<List<Domain.Organisation>>
         {
         }
 
         public class Handler : IRequestHandler<Query, List<Domain.Organisation>>
         
         {
             private readonly DataContext _context;
 
             public Handler(DataContext context)
             {
                 _context = context;
             }
 
             public async Task<List<Domain.Organisation>> Handle(Query request, CancellationToken cancellationToken)
             {
                 var users = await _context.Organisations.ToListAsync();
                 return users;
             }
         }
     }
 }