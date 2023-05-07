using Application.Core;
using MediatR;
using Persistence;

namespace Application.Phones;

public static class DeletePhone
{
	public class Command : IRequest<Result<Unit>>
	{
		public Guid Id { get; set; }
	}

	public class Handler : IRequestHandler<Command, Result<Unit>>
	{
		private readonly DataContext _context;

		public Handler(DataContext context)
		{
			_context = context;
		}

		public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
		{
			var phone = await _context.Phones.FindAsync(
				new object[] { request.Id }, cancellationToken: cancellationToken
			);

			if (phone == null) return null;

			_context.Remove(phone);

			var result = await _context.SaveChangesAsync(cancellationToken) > 0;

			if (!result) return Result<Unit>.Failure("Failed to delete phone");

			return Result<Unit>.Success(Unit.Value);
		}
	}
}
