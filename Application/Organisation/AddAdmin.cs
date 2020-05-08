using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Organisation
{
    public class AddAdmin
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public Guid OrganisationId { get; set; }
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
                var organisation = await _context.Organisations.FindAsync(request.OrganisationId);

                if (organisation == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Organisation = " could not find organisation" });
                }

                var user = await _context.Users.FindAsync(request.UserId);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = " could not find user" });
                }

                var members =
                    await _context.UserOrganisationAdmins.SingleOrDefaultAsync(x =>
                        x.OrganisationId == organisation.Id && x.AppUserId == user.Id);

                if (members != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Members = "already admin of this organisation" });
                }

                members = new Domain.UserOrganisationAdmin
                {
                    Organisation = organisation,
                    AppUser = user
                };

                _context.UserOrganisationAdmins.Add(members);

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