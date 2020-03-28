using System.Collections.Generic;
using System.Threading;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Course
{
    public class List
    {
          public class Query : IRequest<List<Domain.Course>>
        {
        }

        public class Handler : IRequestHandler<Query, List<Domain.Course>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async System.Threading.Tasks.Task<List<Domain.Course>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var courses = await _context.Courses.ToListAsync();
                return courses;
            }
        }
    }
}