using Application.Card;
using Application.Course;
using Application.Group;
using AutoMapper;
using Domain;

namespace Application.User
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<AppUser, UserDto>();
            CreateMap<UserGroup, GroupDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.GroupId))
                .ForMember(d => d.navn, o => o.MapFrom(s => s.Group.navn))
                .ForMember(d => d.beskrivelse, o => o.MapFrom(s => s.Group.beskrivelse))
                .ForMember(d => d.aktiv, o => o.MapFrom(o => o.Group.aktiv))
                .ForMember(d => d.aktiv_til_og_med, o => o.MapFrom(o => o.Group.aktiv_til_og_med))
                .ForMember(d => d.opprettet, o => o.MapFrom(o => o.Group.opprettet))
                .ForMember(d => d.UserGroups, o => o.Ignore());

            CreateMap<UserCourse, CourseDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.CourseId))
                .ForMember(d => d.navn, o => o.MapFrom(s => s.Course.navn))
                .ForMember(d => d.beskrivelse, o => o.MapFrom(s => s.Course.beskrivelse))
                .ForMember(d => d.opprettet, o => o.MapFrom(s => s.Course.opprettet));

            CreateMap<UserCard, CardDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Card.Id))
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.Card.UserId))
                .ForMember(d => d.KortNummer, o => o.MapFrom(s => s.Card.KortNummer))
                .ForMember(d => d.Opprettet, o => o.MapFrom(s => s.Card.Opprettet));
        }
    }
}