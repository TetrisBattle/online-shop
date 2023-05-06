using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Phones;

public static class CreatePhone
{
	public class Command : IRequest
	{
		public Phone Phone { get; set; }
	}

	public class CommandValidator : AbstractValidator<Command>
	 {
		public CommandValidator() => RuleFor(x => x.Phone).SetValidator(new PhoneValidator());
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
			_context.Phones.Add(request.Phone);

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
