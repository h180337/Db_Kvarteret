using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AccessGroup
{
    public class AddToUser
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public string RoleId { get; set; }
        }

        public class Handler : IRequestHandler<Command>

        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var role = await _context.Roles.FindAsync(request.RoleId);

                if (role == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { role = " could not find role" });
                }

                var user = await _context.Users.FindAsync(request.UserId.ToString());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = " could not find user" });
                }
                var isMember = await _userManager.IsInRoleAsync(user, role.Name);
                var members =
                    await _context.UserRoles.SingleOrDefaultAsync(x =>
                        x.RoleId == role.Id && x.UserId == user.Id);

                if (isMember)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Members = user.UserName + " already member of role " + role.Name });
                }

                var result = await _userManager.AddToRoleAsync(user, role.ToString());

                if (result.Succeeded)
                {
                    return Unit.Value;
                }

                throw new Exception("problem saving changes");
            }
        }
    }
}