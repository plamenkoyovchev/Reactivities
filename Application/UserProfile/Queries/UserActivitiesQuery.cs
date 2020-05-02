using System.Collections.Generic;
using Application.Common.DTOs.Activities;
using MediatR;

namespace Application.UserProfile.Queries
{
    public class UserActivitiesQuery : IRequest<List<UserActivityDTO>>
    {
        public UserActivitiesQuery(string username, ActivityFilterType filter)
        {
            this.Username = username;
            this.Filter = filter;
        }

        public string Username { get; }

        public ActivityFilterType Filter { get; }
    }
}