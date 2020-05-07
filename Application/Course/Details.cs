using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Course
{
    public class Details
    {
        public class Query : IRequest<CourseDto>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, CourseDto>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _context = dataContext;
                _mapper = mapper;
            }
            public async Task<CourseDto> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var course = await _context.Courses.FindAsync(request.Id);

                if (course == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { course = "Not found" });
                }
                return _mapper.Map<Domain.Course, CourseDto>(course); ;
            }
        }
    }
}