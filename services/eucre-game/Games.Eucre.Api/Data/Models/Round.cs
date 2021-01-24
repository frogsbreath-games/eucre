using Games.Eucre.Api.Enums;

namespace Games.Eucre.Api.Data.Models
{
	public record Round(
		int RoundNumber,
		PlayerNumber DealerPlayer,
		Card? PickupCard,
		Suit? Trump,
		Trick[] Rounds,
		int RedTeamPoints,
		int BlackTeamPoints);
}
