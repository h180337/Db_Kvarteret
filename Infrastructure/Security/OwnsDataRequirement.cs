using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class OwnsDataRequirement : IAuthorizationRequirement
    {

        public class OwnsDataRequirementHandler : AuthorizationHandler<OwnsDataRequirement>
        {
            private readonly IHttpContextAccessor _httpContextAccessor;
            private readonly DataContext _context;

            public OwnsDataRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
            {
                _httpContextAccessor = httpContextAccessor;
                _context = context;
            }

            protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                OwnsDataRequirement requirement)
            {
                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
                    .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                var user = _context.Users.SingleOrDefault(x => x.UserName == currentUserName);
                var endpoint = ((Microsoft.AspNetCore.Routing.RouteEndpoint)context.Resource).RoutePattern.RawText;
                endpoint.Split("/");

               
                context.Succeed(requirement);


                return Task.CompletedTask;
            }
            private void test() { 

            }
        }
    }
}