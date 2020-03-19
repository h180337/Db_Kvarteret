using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
 
namespace Application.User
{
    public class List
    {
        public class Query : IRequest<List<User>>
        {
        }
 
        public class Handler : IRequestHandler<Query, List<User>>
         
        {
            private readonly DataContext _context;
 
            public Handler(DataContext context)
            {
                _context = context;
            }
 
            public async Task<List<User>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users.ToListAsync();
                var newList = new List<User>();
                foreach (var user in users)
                {
                    var newUser = new User
                    {    
                        Id = user.Id,
                        fornavn = user.fornavn,
                        etternavn = user.etternavn,
                        phoneNumber = user.PhoneNumber,
                        userName = user.UserName,
                        kjonn = user.kjonn,
                        Email = user.Email,
                        workstatus = user.workstatus,
                        created = user.created,
                        dateOfBirth = user.dateOfBirth,
                        streetAddress = user.streetAddress,
                        areaCode = user.areaCode,
                        Token = "Kommer"
                        
                    };
                        newList.Add(newUser);
                }

                return newList;
            }
        }
    }
}