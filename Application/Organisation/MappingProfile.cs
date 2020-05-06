using AutoMapper;
using Domain;

namespace Application.Organisation
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Organisation, OrganisationDto>();
            CreateMap<UserOrganisationAdmin, OrganisationAdminDto>()
                .ForMember(d => d.id, o => o.MapFrom(s => s.AppUserId))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.fornavn,o => o.MapFrom(s => s.AppUser.fornavn))
                .ForMember(d => d.etternavn,o => o.MapFrom(s => s.AppUser.etternavn))
                .ForMember(d => d.kjonn,o => o.MapFrom(s => s.AppUser.kjonn))
                .ForMember(d => d.workstatus,o => o.MapFrom(s => s.AppUser.workstatus))
                .ForMember(d => d.created,o => o.MapFrom(s => s.AppUser.created))
                .ForMember(d => d.dateOfBirth,o => o.MapFrom(s => s.AppUser.dateOfBirth))
                .ForMember(d => d.streetAddress,o => o.MapFrom(s => s.AppUser.streetAddress))
                .ForMember(d => d.areaCode,o => o.MapFrom(s => s.AppUser.areaCode))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.AppUser.Email))
                .ForMember(d => d.phoneNumber,o => o.MapFrom(s => s.AppUser.PhoneNumber));
            CreateMap<Domain.Group, OrganisationGroupDto>();

        }
    }
}