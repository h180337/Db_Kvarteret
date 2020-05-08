using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tags
{
    public class RemoveMember
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public Guid TagId { get; set; }

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
                var tag = await _context.Tags.FindAsync(request.TagId);

                if (tag == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { tag = " could not find tag" });
                }

                var user = await _context.Users.FindAsync(request.UserId.ToString());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = " could not find user" });
                }

                var members = await _context.UserTags.SingleOrDefaultAsync(x => x.TagId == tag.Id && x.AppUserId == user.Id);

                if (members != null)
                {
                    _context.UserTags.Remove(members);

                    var success = await _context.SaveChangesAsync() > 0;
                    if (success)
                    {
                        return Unit.Value;
                    }

                    throw new Exception("Problem saving changes");

                }

                throw new RestException(HttpStatusCode.BadRequest, new { members = "could not find user on tag" });
            }
        }
    }
}