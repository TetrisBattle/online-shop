using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
	[HttpGet]
	public async Task<ActionResult<List<Activity>>> GetActivities()
	{
		return await Mediator.Send(new GetActivities.Query());
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<Activity>> GetActivity(Guid id)
	{
		return await Mediator.Send(new GetActivity.Query { Id = id });
	}

	[HttpPost]
	public async Task<IActionResult> CreateActivity(Activity activity)
	{
		return Ok(await Mediator.Send(new CreateActivity.Command { Activity = activity }));
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateActivity(Guid id, Activity activity)
	{
		activity.Id = id;
		return Ok(await Mediator.Send(new UpdateActivity.Command { Activity = activity }));
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteActivity(Guid id)
	{
		return Ok(await Mediator.Send(new DeleteActivity.Command { Id = id }));
	}
}
