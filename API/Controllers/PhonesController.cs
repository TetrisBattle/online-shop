using Application.Phones;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PhonesController : BaseApiController
{
	[HttpGet]
	public async Task<ActionResult<List<Phone>>> GetAll()
	{
		return await Mediator.Send(new GetAll.Query());
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<Phone>> GetById(Guid id)
	{
		return await Mediator.Send(new GetById.Query { Id = id });
	}

	[HttpPost]
	public async Task<IActionResult> Add(Phone phone)
	{
		return Ok(await Mediator.Send(new Add.Command { Phone = phone }));
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> Edit(Guid id, Phone phone)
	{
		phone.Id = id;
		return Ok(await Mediator.Send(new Edit.Command { Phone = phone }));
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(Guid id)
	{
		return Ok(await Mediator.Send(new Delete.Command { Id = id }));
	}
}
