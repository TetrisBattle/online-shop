
using Domain;

namespace Persistence;

public static class Seed
{
	public static async Task SeedData(DataContext context)
	{
		if (context.Activities.Any()) return;

		var activities = new List<Activity>
		{
			new Activity
			{
				Title = "Past Activity 1",
				Date = DateTime.UtcNow.AddMonths(-2),
				Description = "Activity 2 months ago",
				Category = "drinks",
				City = "London",
				Venue = "Pub",
			},
			new Activity
			{
				Title = "Past Activity 2",
				Date = DateTime.UtcNow.AddMonths(-1),
				Description = "Activity 1 month ago",
				Category = "culture",
				City = "Paris",
				Venue = "Louvre",
			},
			new Activity
			{
				Title = "Future Activity 1",
				Date = DateTime.UtcNow.AddMonths(1),
				Description = "Activity 1 month in future",
				Category = "culture",
				City = "London",
				Venue = "Natural History Museum",
			},
			new Activity
			{
				Title = "Future Activity 2",
				Date = DateTime.UtcNow.AddMonths(2),
				Description = "Activity 2 months in future",
				Category = "music",
				City = "London",
				Venue = "O2 Arena",
			},
			new Activity
			{
				Title = "Future Activity 3",
				Date = DateTime.UtcNow.AddMonths(3),
				Description = "Activity 3 months in future",
				Category = "drinks",
				City = "London",
				Venue = "Another pub",
			},
			new Activity
			{
				Title = "Future Activity 4",
				Date = DateTime.UtcNow.AddMonths(4),
				Description = "Activity 4 months in future",
				Category = "drinks",
				City = "London",
				Venue = "Yet another pub",
			},
			new Activity
			{
				Title = "Future Activity 5",
				Date = DateTime.UtcNow.AddMonths(5),
				Description = "Activity 5 months in future",
				Category = "drinks",
				City = "London",
				Venue = "Just another pub",
			},
			new Activity
			{
				Title = "Future Activity 6",
				Date = DateTime.UtcNow.AddMonths(6),
				Description = "Activity 6 months in future",
				Category = "music",
				City = "London",
				Venue = "Roundhouse Camden",
			},
			new Activity
			{
				Title = "Future Activity 7",
				Date = DateTime.UtcNow.AddMonths(7),
				Description = "Activity 2 months ago",
				Category = "travel",
				City = "London",
				Venue = "Somewhere on the Thames",
			},
			new Activity
			{
				Title = "Future Activity 8",
				Date = DateTime.UtcNow.AddMonths(8),
				Description = "Activity 8 months in future",
				Category = "film",
				City = "London",
				Venue = "Cinema",
			}
		};

		var phones = new List<Phone>
		{
	 		new Phone
			{
				Name = "iPhone 12 Pro Max",
				Price = 1099.99f,
				Description = "Apple iPhone 12 Pro Max smartphone. Announced Oct 2020. Features 6.7″ display, Apple A14 Bionic chipset, 3687 mAh battery, 512 GB storage, 6 GB RAM, Scratch-resistant ceramic glass.",
				Category = "Smartphone",
				PublishDate = DateTime.UtcNow.AddMonths(-1),
				UpdateDate = DateTime.UtcNow,
			},
			new Phone
			{
				Name = "Samsung Galaxy S21 Ultra 5G",
				Price = 1199.99f,
				Description = "Samsung Galaxy S21 Ultra 5G smartphone. Announced Jan 2021. Features 6.8″ display, Exynos 2100 chipset, 5000 mAh battery, 512 GB storage, 16 GB RAM, Corning Gorilla Glass Victus.",
				Category = "Smartphone",
				PublishDate = DateTime.UtcNow.AddMonths(-1),
				UpdateDate = DateTime.UtcNow,
			},
			new Phone
			{
				Name = "Xiaomi Mi 11 Ultra",
				Price = 1199.99f,
				Description = "Xiaomi Mi 11 Ultra smartphone. Announced Mar 2021. Features 6.81″ display, Snapdragon 888 chipset, 5000 mAh battery, 512 GB storage, 12 GB RAM, Corning Gorilla Glass Victus.",
				Category = "Smartphone",
				PublishDate = DateTime.UtcNow.AddMonths(-1),
				UpdateDate = DateTime.UtcNow,
			},
			new Phone
			{
				Name = "OnePlus 9 Pro",
				Price = 1069.99f,
				Description = "OnePlus 9 Pro smartphone. Announced Mar 2021. Features 6.7″ display, Snapdragon 888 chipset, 4500 mAh battery, 256 GB storage, 12 GB RAM, Corning Gorilla Glass 5.",
				Category = "Smartphone",
				PublishDate = DateTime.UtcNow.AddMonths(-1),
				UpdateDate = DateTime.UtcNow,
			},
			new Phone
			{
				Name = "Apple iPhone 12 Pro",
				Price = 999.99f,
				Description = "Apple iPhone 12 Pro smartphone. Announced Oct 2020. Features 6.1″ display, Apple A14 Bionic chipset, 2815 mAh battery, 512 GB storage, 6 GB RAM, Scratch-resistant ceramic glass.",
				Category = "Smartphone",
				PublishDate = DateTime.UtcNow.AddMonths(-1),
				UpdateDate = DateTime.UtcNow,
			},
			new Phone
			{
				Name = "Samsung Galaxy S21+ 5G",
				Price = 999.99f,
				Description = "Samsung Galaxy S21+ 5G smartphone. Announced Jan 2021. Features 6.7″ display, Exynos 2100 chipset, 4800 mAh battery, 256 GB storage, 8 GB RAM, Corning Gorilla Glass Victus.",
				Category = "Smartphone",
				PublishDate = DateTime.UtcNow.AddMonths(-1),
				UpdateDate = DateTime.UtcNow,
			},
			new Phone
			{
				Name = "Xiaomi Mi 11",
				Price = 999.99f,
				Description = "Xiaomi Mi 11 smartphone. Announced Dec 2020. Features 6.81″ display, Snapdragon 888 chipset, 4600 mAh battery, 256 GB storage, 12 GB RAM, Corning Gorilla Glass Victus.",
				Category = "Smartphone",
				PublishDate = DateTime.UtcNow.AddMonths(-1),
				UpdateDate = DateTime.UtcNow,
			}
		};

		await context.Activities.AddRangeAsync(activities);
		await context.Phones.AddRangeAsync(phones);
		await context.SaveChangesAsync();
	}
}
