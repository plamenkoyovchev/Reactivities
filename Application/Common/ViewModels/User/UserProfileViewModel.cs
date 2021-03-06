using System.Collections.Generic;
using Domain;

namespace Application.Common.ViewModels.User
{
    public class UserProfileViewModel
    {
        public string Username { get; set; }

        public string DisplayName { get; set; }

        public Photo Photo { get; set; }

        public string Bio { get; set; }


        /// <summary>
        /// Is following current user
        /// </summary>
        /// <value></value>
        public bool Following { get; set; }

        public int FollowersCount { get; set; }

        public int FollowingsCount { get; set; }

        public ICollection<Photo> Photos { get; set; } = new List<Photo>();
    }
}