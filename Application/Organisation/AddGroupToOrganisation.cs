using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Organisation
{
    public class AddGroupToOrganisation
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
                //get the group
                var group = await _context.Groups.FindAsync(request.GroupId);

                if (group == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {Group = " could not find group"});
                }
                
                //get the organisation

                var organisation = await _context.Organisations.FindAsync(request.OrganisationId);
                
                if (organisation == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {organisation = " could not find organisation"});
                }

                var allreadyPartOfOrganisation = await _context.GroupsInOrganisations.SingleOrDefaultAsync(x =>
                    group.Id == x.Group.Id && x.Organisation.Id == organisation.Id);
                
                if (allreadyPartOfOrganisation != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {organisation = "already in  this organisation"});
                }

                var newconnection = new GroupsInOrganisation
                {
                    Group = group,
                    Organisation = organisation
                };

                _context.GroupsInOrganisations.Add(newconnection);
                
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