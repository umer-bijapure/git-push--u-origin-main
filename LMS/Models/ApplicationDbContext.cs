using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LMS.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<CourseCategory> CourseCategories { get; set; }
        public DbSet<Course> Courses { get; set; }
        // public DbSet<Quiz> Quizzes { get; set; }
        // public DbSet<Module> Modules { get; set; }
        // public DbSet<Group> Groups { get; set; }
        // public DbSet<Attendance> Attendances { get; set; }
        // public DbSet<Institution> Institutions { get; set; }
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Attendance>(entity =>
    {
        entity.HasKey(e => e.Id);

        entity.HasOne(e => e.User)
            .WithMany() // Adjust if you have navigation properties in ApplicationUser
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Use Restrict or SetNull

        entity.HasOne(e => e.Course)
            .WithMany() // Adjust if you have navigation properties in Course
            .HasForeignKey(e => e.CourseId)
            .OnDelete(DeleteBehavior.Restrict); // Use Restrict or SetNull

        entity.HasOne(e => e.Group)
            .WithMany() // Adjust if you have navigation properties in Group
            .HasForeignKey(e => e.GroupId)
            .OnDelete(DeleteBehavior.Restrict); // Use Restrict or SetNull

        entity.HasOne(e => e.Institution)
            .WithMany() // Adjust if you have navigation properties in Institution
            .HasForeignKey(e => e.InstitutionId)
            .OnDelete(DeleteBehavior.Restrict); // Use Restrict or SetNull
    });
}

    }
}
