using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Course
{
    public class Details
    {
         public class Query : IRequest<Domain.Course>
        {
            public Guid Id {get; set;}
        }
        public class Handler : IRequestHandler<Query, Domain.Course>
        {
            private readonly DataContext _context;

            public Handler(DataContext dataContext) {
                _context = dataContext;
            }
            public async Task<Domain.Course> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var course = await _context.Courses.FindAsync(request.Id);

                
                if (course == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {course = "Not found"});
                }
                return course;
            }
        }
    }
}