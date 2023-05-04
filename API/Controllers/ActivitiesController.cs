using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
	[HttpGet]
	public async Task<ActionResult<List<Activity>>> GetAll()
	{
		return await Mediator.Send(new GetAll.Query());
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<Activity>> GetById(Guid id)
	{
		return await Mediator.Send(new GetById.Query { Id = id });
	}

	[HttpPost]
	public async Task<IActionResult> Add(Activity activity)
	{
		return Ok(await Mediator.Send(new Add.Command { Activity = activity }));
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> Edit(Guid id, Activity activity)
	{
		activity.Id = id;
		return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(Guid id)
	{
		return Ok(await Mediator.Send(new Delete.Command { Id = id }));
	}
}
