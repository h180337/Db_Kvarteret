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
            .ForMember(d => d.beskrivelse, o => o.MapFrom(s => s.Group.beskrivelse))
            .ForMember(d => d.aktiv, o => o.MapFrom(o => o.Group.aktiv))
            .ForMember(d => d.aktiv_til_og_med, o => o.MapFrom(o => o.Group.aktiv_til_og_med))
            .ForMember(d => d.opprettet, o => o.MapFrom(o => o.Group.opprettet))
            .ForMember(d => d.UserGroups, o => o.Ignore());
         
            CreateMap<UserCourse, CourseDto>();
        }
    }
}