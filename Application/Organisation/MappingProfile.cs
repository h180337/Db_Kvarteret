using AutoMapper;
using Domain;

namespace Application.Organisation
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Organisation, OrganisationDto>();
            CreateMap<GroupsInOrganisation, GroupInOrganisationDto>()
                .ForMember(d => d.navn, o => o.MapFrom(
                    s => s.Group.navn))
                .ForMember(d => d.beskrivelse, o => o.MapFrom(
                    s => s.Group.beskrivelse))
                .ForMember(d => d.aktiv, o => o.MapFrom(
                    s => s.Group.aktiv))
                .ForMember(d => d.aktiv_til_og_med, o => o.MapFrom(
                    s => s.Group.aktiv_til_og_med))
                .ForMember(d => d.opprettet, o => o.MapFrom(
                    s => s.Group.opprettet));
        }
    }
}