using AutoMapper;

namespace Application.Dependent
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Dependent, DependentDto>();
            CreateMap<Domain.AppUser, DependentUserDto>();
        }
    }
}