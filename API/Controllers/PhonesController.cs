using Application.Phones;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PhonesController : BaseApiController
{
	[HttpGet]
	public async Task<IActionResult> GetPhones()
	{
		return HandleResult(await Mediator.Send(new GetPhones.Query()));
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> FindPhone(Guid id)
	{
		return HandleResult(await Mediator.Send(new FindPhone.Query { Id = id }));
	}

	[Authorize]
	[HttpPost]
	public async Task<IActionResult> CreatePhone(Phone phone)
	{
		return HandleResult(await Mediator.Send(new CreatePhone.Command { Phone = phone }));
	}

	[Authorize]
	[HttpPut("{id}")]
	public async Task<IActionResult> UpdatePhone(Guid id, Phone phone)
	{
		phone.Id = id;
		return HandleResult(await Mediator.Send(new UpdatePhone.Command { Phone = phone }));
	}

	[Authorize]
	[HttpDelete("{id}")]
	public async Task<IActionResult> DeletePhone(Guid id)
	{
		return HandleResult(await Mediator.Send(new DeletePhone.Command { Id = id }));
	}
}
