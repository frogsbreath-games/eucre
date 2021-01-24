using Games.Eucre.Api.Enums;

namespace Games.Eucre.Api.Data.Models
{
	public record Trick(
		int TrickNumber,
		PlayerNumber LeadPlayer,
		PlayedCard[] PlayPile,
		PlayerNumber? WinnerPlayer);
}
