using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Group;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class GroupHistory
    {
        public class Query : IRequest<List<GroupDto>>
        {
            public string id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<GroupDto>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<GroupDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var groups = await _context.Groups.ToListAsync();

                var newList = new List<GroupDto>();
                foreach (var group in groups)
                {
                    var BrukerGrupper = group.UserGroups;
                    foreach (var usergroup in BrukerGrupper)
                    {
                        if (usergroup.AppUserId == request.id && group.aktiv == "inactive")
                        {
                            var groupToReturn = _mapper.Map<Domain.Group, GroupDto>(group);
                            newList.Add(groupToReturn);
                        }
                    }
                }
                return newList;
            }
        }
    }
}