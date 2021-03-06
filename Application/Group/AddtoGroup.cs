using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Group
{
    public class AddtoGroup
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
                    throw new RestException(HttpStatusCode.NotFound, new { Group = " could not find group" });
                }

                var user = await _context.Users.FindAsync(request.UserId);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = " could not find user" });
                }

                var members =
                    await _context.UserGroups.SingleOrDefaultAsync(x =>
                        x.GroupId == group.Id && x.AppUserId == user.Id);

                if (members != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Members = "already member of this group" });
                }

                members = new UserGroup
                {
                    Group = group,
                    AppUser = user,
                    GroupAdmin = false,
                    DateJoined = DateTime.Now
                };

                _context.UserGroups.Add(members);

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