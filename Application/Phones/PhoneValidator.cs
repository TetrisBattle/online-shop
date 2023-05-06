using Domain;
using FluentValidation;

namespace Application.Phones;
public class PhoneValidator : AbstractValidator<Phone>
{
	public PhoneValidator()
	{
		RuleFor(x => x.Name).NotEmpty();
		RuleFor(x => x.Price).NotEmpty();
		RuleFor(x => x.Category).NotEmpty();
		RuleFor(x => x.PublishDate).NotEmpty();
	}
}
