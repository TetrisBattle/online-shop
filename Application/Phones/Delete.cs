using MediatR;
using Persistence;

namespace Application.Phones;

public static class Delete
{
	public class Command : IRequest
	{
		public Guid Id { get; set; }
	}

	public class Handler : IRequestHandler<Command>
	{
		private readonly DataContext _context;

		public Handler(DataContext context)
		{
			_context = context;
		}

		public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
		{
			var phone = await _context.Phones.FindAsync(new object[] { request.Id }, cancellationToken: cancellationToken);

			_context.Remove(phone);

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
