using Games.Eucre.Api.Enums;

namespace Games.Eucre.Api.Data.Models
{
	public record PlayedCard(
		PlayerNumber Player,
		Card Card);
}
