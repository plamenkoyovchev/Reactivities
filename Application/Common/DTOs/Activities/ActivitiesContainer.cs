using System.Collections.Generic;

namespace Application.Common.DTOs.Activities
{
    public class ActivitiesContainer
    {
        public ActivitiesContainer(List<ActivityDTO> activities, int activitiesCount)
        {
            this.Activities = activities;
            this.ActivitiesCount = activitiesCount;
        }

        public List<ActivityDTO> Activities { get; }

        public int ActivitiesCount { get; }
    }
}