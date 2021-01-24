namespace Games.Eucre.Api.Models
{
	public record GameModel
	{
		public BoardModel Board { get; set; } = new BoardModel();
	}
}
