using Application.Phones;
using Domain;
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
	public async Task<IActionResult> GetPhone(Guid id)
	{
		return HandleResult(await Mediator.Send(new GetPhone.Query { Id = id }));
	}

	[HttpPost]
	public async Task<IActionResult> CreatePhone(Phone phone)
	{
		return HandleResult(await Mediator.Send(new CreatePhone.Command { Phone = phone }));
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdatePhone(Guid id, Phone phone)
	{
		phone.Id = id;
		return HandleResult(await Mediator.Send(new UpdatePhone.Command { Phone = phone }));
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeletePhone(Guid id)
	{
		return HandleResult(await Mediator.Send(new DeletePhone.Command { Id = id }));
	}
}
