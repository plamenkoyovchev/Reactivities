using System;
using Domain;
using MediatR;
namespace Application.Activities.Create
{
    public class CreateActivityCommand : IRequest<Activity>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}