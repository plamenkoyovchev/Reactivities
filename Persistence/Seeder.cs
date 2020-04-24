using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seeder
    {
        public static async Task SeedDataAsync(DataContext context, UserManager<ReactivityUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                await AddUsersAsync(context, userManager);
            }

            if (!context.Activities.Any())
            {
                AddActivities(context);
            }
        }

        private static async Task AddUsersAsync(DataContext context, UserManager<ReactivityUser> userManager)
        {
            var users = new List<ReactivityUser>()
            {
                new ReactivityUser()
                {
                    Id = "string-12",
                    DisplayName = "Pako",
                    UserName = "pakata",
                    Email = "pakata@abv.bg"
                },
                new ReactivityUser()
                {
                    Id = "string-23",
                    DisplayName = "Sako",
                    UserName = "sakata",
                    Email = "sakata@abv.bg"
                },
                new ReactivityUser()
                {
                    Id = "string-34",
                    DisplayName = "Cako",
                    UserName = "cakata",
                    Email = "cakata@abv.bg"
                }
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        private static void AddActivities(DataContext context)
        {
            var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "CQRS Demo",
                        Date = DateTime.Now.AddDays(2),
                        Description = "CQRS Demo",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",

                    },
                    new Activity
                    {
                        Title = "Develop .Net Core Apps with VSC",
                        Date = DateTime.Now.AddDays(5),
                        Description = "Develop .Net Core Apps with VSC",
                        Category = "culture",
                        City = "Paris",
                        Venue = "Louvre",
                    },
                    new Activity
                    {
                        Title = "React & MobX",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "React & MobX",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                    }
                };

            foreach (var activity in activities)
            {
                var userActivity = new UserActivity()
                {
                    ReactivityUserId = "string-12",
                    Activity = activity,
                    IsHost = true
                };
                context.UserActivities.Add(userActivity);
            }

            context.SaveChanges();
        }
    }
}