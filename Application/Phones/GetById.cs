using Domain;
using MediatR;
using Persistence;

namespace Application.Phones;

public static class GetById
{
	public class Query : IRequest<Phone>
	{
		public Guid Id { get; set; }
	}

	public class Handler : IRequestHandler<Query, Phone>
	{
		private readonly DataContext _context;

		public Handler(DataContext context)
		{
			_context = context;
		}

		public async Task<Phone> Handle(Query request, CancellationToken cancellationToken)
		{
			return await _context.Phones.FindAsync(new object[] { request.Id }, cancellationToken: cancellationToken);
		}
	}
}
