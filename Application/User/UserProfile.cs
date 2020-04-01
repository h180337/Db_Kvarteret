using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.User
{
    public class UserProfile
    {
        public class Query : IRequest<User>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.Id.ToString());
                
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {user = "Not found"});
                }

                return new User
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
                    areaCode = user.areaCode
                };
            }
        }
    }
}