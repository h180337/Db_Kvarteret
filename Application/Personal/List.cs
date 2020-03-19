using System.Collections.Generic;
 using System.Threading;
 using System.Threading.Tasks;
 using MediatR;
 using Microsoft.EntityFrameworkCore;
 using Persistence;
 
 namespace Application.Personal
 {
     public class List
     {
         public class Query : IRequest<List<Domain.Personal>>
         {
         }
 
         public class Handler : IRequestHandler<Query, List<Domain.Personal>>
         
         {
             private readonly DataContext _context;
 
             public Handler(DataContext context)
             {
                 _context = context;
             }
 
             public async Task<List<Domain.Personal>> Handle(Query request, CancellationToken cancellationToken)
             {
                 var users = await _context.Personal.ToListAsync();
                 return users;
             }
         }
     }
 }