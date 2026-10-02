namespace TaskManager.Api.Data;

using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Models;

public class TaskManagerDbContext : DbContext
{
    public TaskManagerDbContext(DbContextOptions<TaskManagerDbContext> options) : base(options)
    {
        
    }

    public DbSet<TaskItem> Tasks { get; set; }
    public DbSet<User> Users {get; set; }
}