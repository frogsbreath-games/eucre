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
			return BuildGame(BoardStatus.GameStarting, "New Game", GetDeck());
		}

		private static CardModel[] GetDeck()
		{
			List<CardModel> deck = new List<CardModel>();
			foreach (Suit suit in Enum.GetValues(typeof(Suit)))
			{
				deck.AddRange(Enumerable.Range(9, 5).Prepend(1).Select(index => new CardModel(suit, index)).ToArray());
			}
			return deck.ToArray();
		}

		private static GameModel BuildGame(
			BoardStatus status,
			string description,
			CardModel[] cards)
		{
			return new GameModel
			{
				Board = new BoardModel
				{
					BoardStatus = status,
					Description = description,
					Deck = cards.ToList(),
					PlayerHand = new HandModel(cards[..5].ToList()),
					PartnerHand = new HandModel(cards[5..10].ToList()),
					LeftOpponentHand = new HandModel(cards[10..15].ToList()),
					RightOpponentHand = new HandModel(cards[15..20].ToList())
				}
			};
		}

		public static GameModel Randomize(GameModel game, IPrincipal user, Random random)
		{
			return BuildGame(
				BoardStatus.Shuffling,
				$"{user.Identity?.Name ?? "Anonymous"} shuffled the game!",
				GetDeck().OrderBy(x => random.Next(0, 52)).ToArray());
		}

		public static GameModel PlayCard(GameModel game, CardModel card, IPrincipal user, Random random)
		{
			if (game is null)
			{
				throw new ArgumentNullException(nameof(game));
			}

			if (card is null)
			{
				throw new ArgumentNullException(nameof(card));
			}

			var board = game.Board;

			board.Deck.Remove(card);
			board.PlayerHand.Cards.Remove(card);
			board.PartnerHand.Cards.Remove(card);
			board.LeftOpponentHand.Cards.Remove(card);
			board.RightOpponentHand.Cards.Remove(card);
			board.Pile.Add(card);

			board = board with
			{
				BoardStatus = BoardStatus.Playing,
				Description = $"{user.Identity?.Name ?? "Anonymous"} played a card! {card.Value} of {card.Suit}"
			};

			return game with { Board = board };
		}
	}
}
