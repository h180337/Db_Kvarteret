using Application.AccessGroup;
using Application.Card;
using Application.Course;
using Application.Dependent;
using Application.Group;
using Application.History;
using Application.Organisation;
using Application.Tags;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Identity;

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
                .ForMember(d => d.groupType, o => o.MapFrom(s => s.Group.groupType))
                .ForMember(d => d.aktiv_til_og_med, o => o.MapFrom(o => o.Group.aktiv_til_og_med))
                .ForMember(d => d.opprettet, o => o.MapFrom(o => o.Group.opprettet))
                .ForMember(d => d.UserGroups, o => o.Ignore());

            CreateMap<UserCourse, CourseDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.CourseId))
                .ForMember(d => d.navn, o => o.MapFrom(s => s.Course.navn))
                .ForMember(d => d.beskrivelse, o => o.MapFrom(s => s.Course.beskrivelse))
                .ForMember(d => d.opprettet, o => o.MapFrom(s => s.Course.opprettet));

            CreateMap<UserTags, TagsDto>()
                .ForMember(d => d.Id, o => o.MapFrom(m => m.Tag.Id))
                .ForMember(d => d.tagText, o => o.MapFrom(m => m.Tag.tagText));

            CreateMap<UserHistory, HistoryDto>()
                .ForMember(d => d.Id, o => o.MapFrom(m => m.History.Id))
                .ForMember(d => d.GroupName, o => o.MapFrom(m => m.History.GroupName))
                .ForMember(d => d.Position, o => o.MapFrom(m => m.History.Position))
                .ForMember(d => d.GroupType, o => o.MapFrom(m => m.History.GroupType))
                .ForMember(d => d.Year, o => o.MapFrom(m => m.History.Year))
                .ForMember(d => d.Semester, o => o.MapFrom(m => m.History.Semester));

            CreateMap<AppUserRoles, AccessGroupDto>()
                .ForMember(d => d.Id, o => o.MapFrom(m => m.RoleId))
                .ForMember(d => d.Name, o => o.MapFrom(m => m.Role.Name));

            CreateMap<UserOrganisationAdmin, OrganisationDto>()
                .ForMember(d => d.Id, o => o.MapFrom(m => m.OrganisationId))
                .ForMember(d => d.name, o => o.MapFrom(m => m.Organisation.name))
                .ForMember(d => d.description, o => o.Ignore());

            CreateMap<Domain.Dependent, DependentUserDto>();

            CreateMap<Domain.Card, CardUserDto>();
        }
    }
}