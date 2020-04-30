using System.Collections.Generic;
using Application.Common.DTOs.Activities;
using MediatR;

namespace Application.UserProfile.Queries
{
    public class UserActivitiesQuery : IRequest<List<UserActivityDTO>>
    {
        public string Username { get; set; }

        public ActivityFilterType Filter { get; set; }
    }
}