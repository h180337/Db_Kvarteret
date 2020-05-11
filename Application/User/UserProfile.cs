using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Persistence;

namespace Application.User
{
    public class UserProfile
    {
        public class Query : IRequest<UserDto>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly IAuthorizationService _authorizationService;
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper, IAuthorizationService authorizationService)
            {
                _context = context;
                _mapper = mapper;
                _authorizationService = authorizationService;
            }

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.Id.ToString());
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Not found" });
                }

                var UserToReturn = _mapper.Map<AppUser, UserDto>(user);
                return UserToReturn;
            }
        }
    }
}