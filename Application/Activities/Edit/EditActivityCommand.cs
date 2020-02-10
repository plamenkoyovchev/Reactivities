using System;
using Application.Activities.Create;

namespace Application.Activities.Edit
{
    public class EditActivityCommand : CreateActivityCommand
    {
        public string Id { get; set; }
    }
}