using AutoMapper;

namespace Application.Card
{
    public class MappingProfile : Profile
    {
         public MappingProfile()
        {
            CreateMap<Domain.Card, CardDto>()
            .ForMember(o => o.UserCard, s => s.MapFrom(s => s.UserCard.AppUserId));

        }
    }
}