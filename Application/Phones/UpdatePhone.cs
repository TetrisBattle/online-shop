using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Phones;

public static class UpdatePhone
{
	public class Command : IRequest
	{
		public Phone Phone { get; set; }
	}

	public class Handler : IRequestHandler<Command>
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;

		public Handler(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
		{
			var phone = await _context.Phones.FindAsync(new object[] { request.Phone.Id }, cancellationToken: cancellationToken);

			_mapper.Map(request.Phone, phone);

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
