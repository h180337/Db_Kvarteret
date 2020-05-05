using AutoMapper;
using Domain;

namespace Application.AccessGroup
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            AllowNullCollections = true;
            AllowNullDestinationValues = true;

            CreateMap<Domain.AccessGroup, AccessGroupDto>();
            CreateMap<AppUserRoles, AccessGroupMemberDto>()
                .ForMember(d => d.id, o => o.MapFrom(s => s.UserId))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName))
                .ForMember(d => d.fornavn, o => o.MapFrom(s => s.User.fornavn))
                .ForMember(d => d.etternavn, o => o.MapFrom(s => s.User.etternavn))
                .ForMember(d => d.kjonn, o => o.MapFrom(s => s.User.kjonn))
                .ForMember(d => d.workstatus, o => o.MapFrom(s => s.User.workstatus))
                .ForMember(d => d.created, o => o.MapFrom(s => s.User.created))
                .ForMember(d => d.dateOfBirth, o => o.MapFrom(s => s.User.dateOfBirth))
                .ForMember(d => d.streetAddress, o => o.MapFrom(s => s.User.streetAddress))
                .ForMember(d => d.areaCode, o => o.MapFrom(s => s.User.areaCode))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.User.Email))
                .ForMember(d => d.phoneNumber, o => o.MapFrom(s => s.User.PhoneNumber));
        }
    }
}