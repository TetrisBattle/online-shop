using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Phones;

public static class GetPhone
{
	public class Query : IRequest<Result<Phone>>
	{
		public Guid Id { get; set; }
	}

	public class Handler : IRequestHandler<Query, Result<Phone>>
	{
		private readonly DataContext _context;

		public Handler(DataContext context)
		{
			_context = context;
		}

		public async Task<Result<Phone>> Handle(Query request, CancellationToken cancellationToken)
		{
			var phone = await _context.Phones.FindAsync(
				new object[] { request.Id }, cancellationToken: cancellationToken
			);
			return Result<Phone>.Success(phone);
		}
	}
}
