using AutoMapper;
using Domain;

namespace Application.Organisation
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Organisation, OrganisationDto>();
        }
    }
}