using System;
using System.Linq;
using System.Reflection;
using Application.Common.DTOs.Attendee;
using Application.Common.DTOs.Comments;
using Application.Common.Mappings.Resolvers;
using AutoMapper;
using Domain;

namespace Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
            CreateCustomMappings();
        }

        private void ApplyMappingsFromAssembly(Assembly assembly)
        {
            var types = assembly.GetExportedTypes()
                .Where(t => t.GetInterfaces().Any(i =>
                    i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapFrom<>)))
                .ToList();

            foreach (var type in types)
            {
                var instance = Activator.CreateInstance(type);

                var methodInfo = type.GetMethod("Mapping")
                    ?? type.GetInterface("IMapFrom`1").GetMethod("Mapping");

                methodInfo?.Invoke(instance, new object[] { this });
            }
        }

        private void CreateCustomMappings()
        {
            CreateMap<UserActivity, AttendeeDTO>()
                .ForMember(a => a.Username, o => o.MapFrom(x => x.ReactivityUser.UserName))
                .ForMember(a => a.DisplayName, o => o.MapFrom(x => x.ReactivityUser.DisplayName))
                .ForMember(a => a.Image, o => o.MapFrom(x => x.ReactivityUser.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(a => a.Following, o => o.MapFrom<UserActivityFollowingResolver>());

            CreateMap<Comment, CommentDTO>()
                .ForMember(c => c.Username, o => o.MapFrom(x => x.Author.UserName))
                .ForMember(c => c.DisplayName, o => o.MapFrom(x => x.Author.DisplayName))
                .ForMember(c => c.Photo, o => o.MapFrom(x => x.Author.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}