using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Games.Eucre.Api.Clients;
using Games.Eucre.Api.Enums;
using Games.Eucre.Api.Hubs;
using Games.Eucre.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Games.Eucre.Api.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/eucre")]
	[Produces("application/json"), Consumes("application/json")]
	public class GameController : ControllerBase
	{
		private readonly IHubContext<GameplayHub, IGameplayClient> _hubContext;

		public GameController(IHubContext<GameplayHub, IGameplayClient> hubContext)
		{
			_hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
		}

		protected IEnumerable<CardModel> GetDeck()
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

		[HttpGet("game")]
		public GameModel GetEucreGame()
		{
			return new GameModel
			{
				BoardStatus = BoardStatus.GameStarting,
				Description = "New Game",
				Deck = GetDeck().ToList()
			};
		}

		[HttpPost("shuffle")]
		public async Task<bool> Shuffle()
		{
			var cards = GetDeck();

			var rand = new Random();

			cards = cards.OrderBy(x => rand.Next(0, 52));

			var gameState = new GameModel
			{
				BoardStatus = BoardStatus.Shuffling,
				Description = $"{User.Identity?.Name ?? "Anonymous"} shuffled the game!",
				Deck = cards.ToList()
			};

			await _hubContext.Clients.All.UpdateGame(gameState);

			return true;
		}

		[HttpPost("play")]
		public async Task<bool> Play(CardModel card)
		{
			var cards = GetDeck();

			var rand = new Random();

			cards = cards.OrderBy(x => rand.Next(0, 52));

			var gameState = new GameModel
			{
				BoardStatus = BoardStatus.Playing,
				Description = $"{User.Identity?.Name ?? "Anonymous"} played a card! {card.Value} of {card.Suit}",
				Deck = cards.ToList(),
				Pile = new List<CardModel> { card }
			};

			await _hubContext.Clients.All.UpdateGame(gameState);

			return true;
		}
	}
}
