using System;
using Application.Activities.Create;

namespace Application.Activities.Edit
{
    public class EditActivityCommand : CreateActivityCommand
    {
        public Guid Id { get; set; }
    }
}