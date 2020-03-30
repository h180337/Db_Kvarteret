using AutoMapper;
using Domain;

namespace Application.Group
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Group, GroupDto>();
            CreateMap<UserGroup, GroupMemberDto>()
                .ForMember(d => d.Username,
                    o => o.MapFrom(
                        s => s.AppUser.UserName))
                .ForMember(d => d.IsAdmin,
                    o => o.MapFrom(
                        s => s.GroupAdmin));
        }
    }
}