using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Phones;

public static class CreatePhone
{
	public class Command : IRequest<Result<Unit>>
	{
		public Phone Phone { get; set; }
	}

	public class CommandValidator : AbstractValidator<Command>
	 {
		public CommandValidator() => RuleFor(x => x.Phone).SetValidator(new PhoneValidator());
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
			_context.Phones.Add(request.Phone);

			var result = await _context.SaveChangesAsync(cancellationToken) > 0;

			if (!result) return Result<Unit>.Failure("Failed to create phone");

			return Result<Unit>.Success(Unit.Value);
		}
	}
}
