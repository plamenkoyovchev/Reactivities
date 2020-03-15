using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<ReactivityUser>
    {
        public DataContext(DbContextOptions options)
        : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<UserActivity> UserActivities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Value>()
                .HasData(new Value[]
                {
                    new Value { Id = 1, Name = "Value 1" },
                    new Value { Id = 2, Name = "Value 2" },
                    new Value { Id = 3, Name = "Value 3" }
                });

            modelBuilder.Entity<UserActivity>()
                .HasKey(x => new { x.ReactivityUserId, x.ActivityId });

            modelBuilder.Entity<UserActivity>()
                .HasOne(a => a.ReactivityUser)
                .WithMany(ua => ua.UserActivities)
                .HasForeignKey(r => r.ReactivityUserId);

            modelBuilder.Entity<UserActivity>()
                .HasOne(u => u.Activity)
                .WithMany(ua => ua.UserActivities)
                .HasForeignKey(a => a.ActivityId);
        }
    }
}
