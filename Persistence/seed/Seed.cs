
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public static class Seed
{
	public static async Task SeedData(
		DataContext context,
		UserManager<User> userManager
	)
	{
		if (!userManager.Users.Any()) {
			var users = new List<User> {
				new User {
					UserName = "TestUser",
					FirstName = "FirstName",
					LastName = "LastName",
					Email = "test@test.com",
				},
				new User {
					UserName = "TestAdmin",
					FirstName = "Admin",
					LastName = "Administrator",
					Email = "admin@test.com",
				},
			};
			foreach (var user in users) {
				await userManager.CreateAsync(user, "Password123");
			}
		}

		if (context.Phones.Any()) return;

		var phoneSeed = PhoneSeed.GetSeed();
		await context.Phones.AddRangeAsync(phoneSeed);
		await context.SaveChangesAsync();
	}
}
