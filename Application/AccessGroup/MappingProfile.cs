using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Application.AccessGroup
{
    public class MappingProfile : Profile
    {
         public MappingProfile()
        {
            CreateMap<Domain.AccessGroup, AccessGroupDto>();

        }
    }
}