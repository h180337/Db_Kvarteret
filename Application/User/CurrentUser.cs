
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<UserDto>
        {
        }

        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IuserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IuserAccessor userAccessor, IMapper mapper)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                {
                    var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                    return _mapper.Map<AppUser, UserDto>(user);
                    
                }
                
            }
        }
    }
}