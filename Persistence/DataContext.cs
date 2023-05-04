using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : DbContext
{
	public DbSet<Activity> Activities { get; set; }
	public DbSet<Phone> Phones { get; set; }

	public DataContext(DbContextOptions options) : base(options) {}
}
