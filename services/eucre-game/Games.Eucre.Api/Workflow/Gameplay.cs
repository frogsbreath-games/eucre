using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using Games.Eucre.Api.Enums;
using Games.Eucre.Api.Models;

namespace Games.Eucre.Api.Workflow
{
	public static class Gameplay
	{
		public static GameModel CreateGame()
		{
			return new GameModel
			{
				BoardStatus = BoardStatus.GameStarting,
				Description = "New Game",
				Deck = GetDeck().ToList()
			};
		}

		private static IEnumerable<CardModel> GetDeck()
		{
			List<CardModel> deck = new List<CardModel>();
			foreach (Suit suit in Enum.GetValues(typeof(Suit)))
			{
				deck.AddRange(Enumerable.Range(9, 5).Prepend(1).Select(index => new CardModel
				{
					Value = index,
					Suit = suit,
				}).ToArray());
			}
			return deck;
		}

		public static GameModel Randomize(GameModel game, IPrincipal user, Random random)
		{
			var cards = GetDeck();

			cards = cards.OrderBy(x => random.Next(0, 52));

			return new GameModel
			{
				BoardStatus = BoardStatus.Shuffling,
				Description = $"{user.Identity?.Name ?? "Anonymous"} shuffled the game!",
				Deck = cards.ToList()
			};
		}

		public static GameModel PlayCard(GameModel game, CardModel card, IPrincipal user, Random random)
		{
			var cards = GetDeck();

			cards = cards.OrderBy(x => random.Next(0, 52));

			return new GameModel
			{
				BoardStatus = BoardStatus.Playing,
				Description = $"{user.Identity?.Name ?? "Anonymous"} played a card! {card.Value} of {card.Suit}",
				Deck = cards.ToList(),
				Pile = new List<CardModel> { card }
			};
		}
	}
}
