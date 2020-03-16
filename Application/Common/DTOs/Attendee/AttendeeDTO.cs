using Application.Common.Mappings;
using Domain;

namespace Application.Common.DTOs.Attendee
{
    public class AttendeeDTO : IMapFrom<UserActivity>
    {
        public string Username { get; set; }

        public string DisplayName { get; set; }

        public string Image { get; set; }

        public bool IsHost { get; set; }
    }
}