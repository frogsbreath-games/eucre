using Games.Eucre.Api.Enums;
using Games.Eucre.Api.Extensions;
using Xunit;

namespace Games.Eucre.Tests.Unit.Extensions
{
	public static class SuitExtensionsTests
	{
		[Theory]
		[InlineData(Suit.Hearts, Suit.Hearts, true)]
		[InlineData(Suit.Hearts, Suit.Clubs, false)]
		[InlineData(Suit.Hearts, Suit.Spades, false)]
		[InlineData(Suit.Hearts, Suit.Diamonds, true)]
		[InlineData(Suit.Clubs, Suit.Hearts, false)]
		[InlineData(Suit.Clubs, Suit.Clubs, true)]
		[InlineData(Suit.Clubs, Suit.Spades, true)]
		[InlineData(Suit.Clubs, Suit.Diamonds, false)]
		[InlineData(Suit.Spades, Suit.Hearts, false)]
		[InlineData(Suit.Spades, Suit.Clubs, true)]
		[InlineData(Suit.Spades, Suit.Spades, true)]
		[InlineData(Suit.Spades, Suit.Diamonds, false)]
		[InlineData(Suit.Diamonds, Suit.Hearts, true)]
		[InlineData(Suit.Diamonds, Suit.Clubs, false)]
		[InlineData(Suit.Diamonds, Suit.Spades, false)]
		[InlineData(Suit.Diamonds, Suit.Diamonds, true)]
		public static void IsSameColor_Explicit(Suit a, Suit b, bool expected)
		{
			var result = a.IsSameColor(b);

			Assert.Equal(expected, result);
		}
	}
}
