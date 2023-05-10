namespace Domain;

public static class PhoneSeed
{
	public static List<Phone> GetSeed()
	{
		return new List<Phone>
		{
	 		new Phone
			{
				Name = "iPhone 12 Pro Max",
				Price = 1099.99f,
				Description = "Apple iPhone 12 Pro Max smartphone. Announced Oct 2020. Features 6.7″ display, Apple A14 Bionic chipset, 3687 mAh battery, 512 GB storage, 6 GB RAM, Scratch-resistant ceramic glass.",
				Category = "iOS",
				PublishDate = DateTime.UtcNow.AddMonths(-2),
				UpdateDate = DateTime.UtcNow.AddMonths(-1),
			},
			new Phone
			{
				Name = "Samsung Galaxy S21 Ultra 5G",
				Price = 1199.99f,
				Description = "Samsung Galaxy S21 Ultra 5G smartphone. Announced Jan 2021. Features 6.8″ display, Exynos 2100 chipset, 5000 mAh battery, 512 GB storage, 16 GB RAM, Corning Gorilla Glass Victus.",
				Category = "Android",
				PublishDate = DateTime.UtcNow.AddMonths(-4),
				UpdateDate = DateTime.UtcNow.AddMonths(-3),
			},
			new Phone
			{
				Name = "Xiaomi Mi 11 Ultra",
				Price = 1199.99f,
				Description = "Xiaomi Mi 11 Ultra smartphone. Announced Mar 2021. Features 6.81″ display, Snapdragon 888 chipset, 5000 mAh battery, 512 GB storage, 12 GB RAM, Corning Gorilla Glass Victus.",
				Category = "Android",
				PublishDate = DateTime.UtcNow.AddMonths(-6),
				UpdateDate = DateTime.UtcNow.AddMonths(-5),
			},
			new Phone
			{
				Name = "OnePlus 9 Pro",
				Price = 1069.99f,
				Description = "OnePlus 9 Pro smartphone. Announced Mar 2021. Features 6.7″ display, Snapdragon 888 chipset, 4500 mAh battery, 256 GB storage, 12 GB RAM, Corning Gorilla Glass 5.",
				Category = "Android",
				PublishDate = DateTime.UtcNow.AddMonths(-8),
				UpdateDate = DateTime.UtcNow.AddMonths(-7),
			},
			new Phone
			{
				Name = "Apple iPhone 12 Pro",
				Price = 999.99f,
				Description = "Apple iPhone 12 Pro smartphone. Announced Oct 2020. Features 6.1″ display, Apple A14 Bionic chipset, 2815 mAh battery, 512 GB storage, 6 GB RAM, Scratch-resistant ceramic glass.",
				Category = "iOS",
				PublishDate = DateTime.UtcNow.AddMonths(-10),
				UpdateDate = DateTime.UtcNow.AddMonths(-9),
			},
			new Phone
			{
				Name = "Samsung Galaxy S21+ 5G",
				Price = 999.99f,
				Description = "Samsung Galaxy S21+ 5G smartphone. Announced Jan 2021. Features 6.7″ display, Exynos 2100 chipset, 4800 mAh battery, 256 GB storage, 8 GB RAM, Corning Gorilla Glass Victus.",
				Category = "Android",
				PublishDate = DateTime.UtcNow.AddMonths(-12),
				UpdateDate = DateTime.UtcNow.AddMonths(-11),
			},
			new Phone
			{
				Name = "Xiaomi Mi 11",
				Price = 999.99f,
				Description = "Xiaomi Mi 11 smartphone. Announced Dec 2020. Features 6.81″ display, Snapdragon 888 chipset, 4600 mAh battery, 256 GB storage, 12 GB RAM, Corning Gorilla Glass Victus.",
				Category = "Android",
				PublishDate = DateTime.UtcNow.AddMonths(-14),
				UpdateDate = DateTime.UtcNow.AddMonths(-13),
			}
		};
	}
}
