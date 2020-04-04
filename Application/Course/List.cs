using System.Collections.Generic;
using System.Threading;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Course
{
    public class List
    {
        public class Query : IRequest<List<CourseDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<CourseDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async System.Threading.Tasks.Task<List<CourseDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var courses = await _context.Courses.ToListAsync();

                return _mapper.Map<List<Domain.Course>, List<CourseDto>>(courses);
            }
        }
    }
}