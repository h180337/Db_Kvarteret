
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User>
        {
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IuserAccessor _userAccessor;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IuserAccessor userAccessor)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _userAccessor = userAccessor;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                {
                    var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
                    
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
                        areaCode = user.areaCode,
                    };
                }
                
            }
        }
    }
}