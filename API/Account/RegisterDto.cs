using System.ComponentModel.DataAnnotations;

namespace API.Account;

public class RegisterDto
{
	[Required]
	[EmailAddress]
	public string Email { get; set; }

	[Required]
	[RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$",
	ErrorMessage = "Password must have 1 Uppercase, 1 Lowercase, 1 number and at least 8 characters")]
	public string Password { get; set; }

	[Required]
	public string Username { get; set; }

	[Required]
	public string FirstName { get; set; }

	[Required]
	public string LastName { get; set; }
}
