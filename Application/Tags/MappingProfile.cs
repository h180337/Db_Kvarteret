using AutoMapper;

namespace Application.Tags
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Tags, TagsDto>();
        }
    }
}