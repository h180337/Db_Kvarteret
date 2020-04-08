using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Group
{
    public class RemoveFromGroup
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public Guid GroupId { get; set; }
        }

        public class Handler : IRequestHandler<Command>

        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var group = await _context.Groups.FindAsync(request.GroupId);

                if (group == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {Group = " could not find group"});
                }

                var user = await _context.Users.FindAsync(request.UserId);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {User = " could not find user"});
                }

                var member =
                    await _context.UserGroups.SingleOrDefaultAsync(x =>
                        x.GroupId == group.Id && x.AppUserId == user.Id);

                if (member == null)
                {
                    return Unit.Value;
                }

                if (member.GroupAdmin)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {member = "you cannot remove yourself as admin"});
                }

                _context.UserGroups.Remove(member);
                
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("problem saving changes");
            }
        }
    }
}