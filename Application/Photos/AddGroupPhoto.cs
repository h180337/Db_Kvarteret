using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Photos
{
    public class AddGroupPhoto
    {
        public class Command : IRequest <Photo>
        {
            public Guid Id { get; set; }
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>

        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                
                var group = await _context.Groups.FindAsync(request.Id);
                
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);
                
                
                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };
                group.GroupPhoto = photo;
                
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return photo;
                }

                throw new Exception("problem saving changes");
            }
        }
    }
}