using System;

namespace Application.Common.DTOs.Activities
{
    public class UserActivityDTO
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Category { get; set; }

        public DateTime Date { get; set; }
    }
}