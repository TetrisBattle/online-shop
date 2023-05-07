using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Phones;

public static class GetPhones
{
	public class Query : IRequest<Result<List<Phone>>> { }

	public class Handler : IRequestHandler<Query, Result<List<Phone>>>
	{
		private readonly DataContext _context;

		public Handler(DataContext context)
		{
			_context = context;
		}

		public async Task<Result<List<Phone>>> Handle(Query request, CancellationToken cancellationToken)
		{
			return Result<List<Phone>>.Success(
				await _context.Phones.ToListAsync(cancellationToken: cancellationToken)
			);
		}
	}
}
