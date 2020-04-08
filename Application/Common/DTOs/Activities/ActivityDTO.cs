using System;
using System.Collections.Generic;
using Application.Common.DTOs.Attendee;
using Application.Common.DTOs.Comments;
using Application.Common.Mappings;
using Domain;
using Newtonsoft.Json;

namespace Application.Common.DTOs.Activities
{
    public class ActivityDTO : IMapFrom<Activity>
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public DateTime Date { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        [JsonProperty("attendees")]
        public ICollection<AttendeeDTO> UserActivities { get; set; }

        public ICollection<CommentDTO> Comments { get; set; }
    }
}