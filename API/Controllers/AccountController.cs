using System.Security.Claims;
using API.Account;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
	private readonly UserManager<User> _userManager;
	private readonly TokenService _tokenService;

	public AccountController(UserManager<User> userManager, TokenService tokenService)
	{
		_userManager = userManager;
		_tokenService = tokenService;
	}

	[AllowAnonymous]
	[HttpPost("register")]
	public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
	{
		if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
		{
			ModelState.AddModelError("email", "Email is already taken");
			return ValidationProblem();
		}

		if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
		{
			ModelState.AddModelError("username", "Username is already taken");
			return ValidationProblem();
		}

		var user = new User
		{
			Email = registerDto.Email,
			UserName = registerDto.Username,
			FirstName = registerDto.FirstName,
			LastName = registerDto.LastName,
		};

		var result = await _userManager.CreateAsync(user, registerDto.Password);

		if (result.Succeeded)
		{
			return CreateUserObject(user);
		}

		return BadRequest("Problem registering user");
	}

	[AllowAnonymous]
	[HttpPost("login")]
	public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
	{
		var user = await _userManager.FindByEmailAsync(loginDto.Email);

		if (user == null) return Unauthorized();

		var result = await _userManager.CheckPasswordAsync(
			user, loginDto.Password
		);

		if (!result) return Unauthorized();

		return CreateUserObject(user);
	}

	[Authorize]
	[HttpGet]
	public async Task<ActionResult<UserDto>> GetCurrentUser()
	{
		var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
		return CreateUserObject(user);
	}

	private UserDto CreateUserObject(User user)
	{
		return new UserDto
		{
			Token = _tokenService.CreateToken(user),
			Username = user.UserName,
			FirstName = user.FirstName,
			LastName = user.LastName,
			Image = null
		};
	}
}
