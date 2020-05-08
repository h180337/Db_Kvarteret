using AutoMapper;
using Domain;

namespace Application.Card
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Card, CardDto>();
            CreateMap<AppUser, CardMemberDto>();
        }
    }
}