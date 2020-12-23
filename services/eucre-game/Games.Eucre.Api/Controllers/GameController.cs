using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Games.Eucre.Api.Clients;
using Games.Eucre.Api.Enums;
using Games.Eucre.Api.Hubs;
using Games.Eucre.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Games.Eucre.Api.Controllers
{
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
				Deck = GetDeck().ToList()
			};
		}

		[HttpPost("shuffle")]
		public async Task<bool> Shuffle()
		{
			var cards = GetDeck();

			var rand = new Random();

			cards = cards.OrderBy(x => rand.Next(0, 52));

			var gameState = new GameModel { Deck = cards.ToList() };

			await _hubContext.Clients.All.UpdateGame(gameState);

			return true;
		}
	}
}
