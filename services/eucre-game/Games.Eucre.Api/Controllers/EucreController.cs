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
	public class EucreController : ControllerBase
	{
		private readonly IHubContext<GameplayHub, IGameplayClient> _hubContext;

		public EucreController(IHubContext<GameplayHub, IGameplayClient> hubContext)
		{
			_hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
		}

		[HttpGet("deck")]
		public IEnumerable<Card> GetEucreDeck()
		{
			List<Card> deck = new List<Card>();
			foreach (Suit suit in Enum.GetValues(typeof(Suit)))
			{
				deck.AddRange(Enumerable.Range(9, 5).Prepend(1).Select(index => new Card
				{
					Value = index,
					Suit = suit,
				}).ToArray());
			}
			return deck;
		}

		[HttpPost("shuffle")]
		public async Task<bool> Shuffle()
		{
			var cards = GetEucreDeck();

			var rand = new Random();

			cards = cards.OrderBy(x => rand.Next(0, 52));

			var gameState = new GameState { Deck = cards.ToList() };

			await _hubContext.Clients.All.UpdateGame(gameState);

			return true;
		}
	}
}
