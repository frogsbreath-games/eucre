using Games.Eucre.Api.Enums;

namespace Games.Eucre.Api.Extensions
{
	public static class SuitExtensions
	{
		public static bool IsSameColor(this Suit thisSuit, Suit otherSuit)
		{
			return thisSuit == otherSuit || (thisSuit, otherSuit) switch
			{
				(Suit.Diamonds, Suit.Hearts) => true,
				(Suit.Hearts, Suit.Diamonds) => true,
				(Suit.Clubs, Suit.Spades) => true,
				(Suit.Spades, Suit.Clubs) => true,
				_ => false
			};
		}
	}
}
