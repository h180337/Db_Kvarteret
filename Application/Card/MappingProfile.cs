using AutoMapper;

namespace Application.Card
{
    public class MappingProfile : Profile
    {
         public MappingProfile()
        {
            CreateMap<Domain.Card, CardDto>();

        }
    }
}