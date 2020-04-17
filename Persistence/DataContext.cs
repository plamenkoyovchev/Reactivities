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

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<UserFollower> Followings { get; set; }

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

            BuildUserActivity(modelBuilder);
            BuildUserFollower(modelBuilder);
        }

        private static void BuildUserActivity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserActivity>(b =>
            {
                b.HasKey(x => new { x.ReactivityUserId, x.ActivityId });

                b.HasOne(a => a.ReactivityUser)
                 .WithMany(ua => ua.UserActivities)
                 .HasForeignKey(r => r.ReactivityUserId);

                b.HasOne(u => u.Activity)
                 .WithMany(ua => ua.UserActivities)
                 .HasForeignKey(a => a.ActivityId);
            });
        }

        private static void BuildUserFollower(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserFollower>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

                b.HasOne(o => o.Observer)
                 .WithMany(f => f.Followings)
                 .HasForeignKey(o => o.ObserverId)
                 .OnDelete(DeleteBehavior.Restrict);

                b.HasOne(o => o.Target)
                 .WithMany(f => f.Followers)
                 .HasForeignKey(t => t.TargetId)
                 .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
