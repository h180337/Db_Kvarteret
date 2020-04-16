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
    public class removeGroupFromOrganisation
    {
        public class Command : IRequest
        {
            public Guid OrganisationId { get; set; }
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

                var organisation = await _context.Organisations.FindAsync(request.OrganisationId);

                if (organisation == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {User = " could not find organisaion"});
                }

                var Ogroup =
                    await _context.GroupsInOrganisations.SingleOrDefaultAsync(x => 
                        x.Organisation.Id == organisation.Id && x.Group.Id == group.Id );

                if (Ogroup == null)
                {
                    return Unit.Value;
                }
                

                _context.GroupsInOrganisations.Remove(Ogroup);
                
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