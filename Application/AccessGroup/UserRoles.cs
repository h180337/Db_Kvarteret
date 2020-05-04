using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AccessGroup
{
    public class UserRoles
    {
        public class Query : IRequest<List<AccessGroupDto>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<AccessGroupDto>>

        {
            private readonly UserManager<AppUser> _userManager;
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
            {
                _context = context;
                _mapper = mapper;
                _userManager = userManager;
            }

            public async Task<List<AccessGroupDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.FindAsync(request.UserId.ToString());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = " could not find user" });
                }
                var roles = await _userManager.GetRolesAsync(user);


                var list = new List<AccessGroupDto>();

                foreach (var role in roles)
                {
                    var accessgroup = await _context.AccessGroups.SingleOrDefaultAsync(x =>
                        x.Name == role);
                    list.Add(_mapper.Map<Domain.AccessGroup, AccessGroupDto>(accessgroup));
                }
                return list;
            }
        }
    }
}