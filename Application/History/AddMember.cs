using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.History
{
    public class AddMember
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public Guid HistoryId { get; set; }

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
                var history = await _context.Historys.FindAsync(request.HistoryId);

                if (history == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { history = " could not find tag" });
                }

                var user = await _context.Users.FindAsync(request.UserId.ToString());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = " could not find user" });
                }

                var members =
                    await _context.UserHistory.SingleOrDefaultAsync(x =>
                        x.HistoryId == history.Id && x.AppUserId == user.Id);

                if (members != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Members = "already member of this history" });
                }

                members = new UserHistory
                {
                    History = history,
                    AppUser = user,
                };

                _context.UserHistory.Add(members);

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