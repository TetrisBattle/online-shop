namespace Domain;

public class Phone
{
	public Guid Id { get; set; }
	public string Name { get; set; }
	public float Price { get; set; }
	public string Description { get; set; }
	public string Category { get; set; }
	public DateTime PublishDate { get; set; }
	public DateTime UpdateDate { get; set; }
}
