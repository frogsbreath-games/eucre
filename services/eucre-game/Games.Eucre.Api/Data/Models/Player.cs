using Games.Eucre.Api.Enums;

namespace Games.Eucre.Api.Data.Models
{
	public record Player(
		PlayerNumber Number,
		User? User,
		Card[] Hand);
}
