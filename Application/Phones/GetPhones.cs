using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Phones;

public static class GetPhones
{
	public class Query : IRequest<List<Phone>> { }

	public class Handler : IRequestHandler<Query, List<Phone>>
	{
		private readonly DataContext _context;

		public Handler(DataContext context)
		{
			_context = context;
		}

		public async Task<List<Phone>> Handle(Query request, CancellationToken cancellationToken)
		{
			return await _context.Phones.ToListAsync(cancellationToken: cancellationToken);
		}
	}
}
