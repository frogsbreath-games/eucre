using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Games.Eucre.Api.Enums;
using Games.Eucre.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Games.Eucre.Api.Controllers
{
	[ApiController]
	[Route("api/eucre")]
	[Produces("application/json"), Consumes("application/json")]
	public class EucreController : ControllerBase
	{
		[HttpGet("deck")]
		public IEnumerable<Card> GetEucreDeck()
		{
			List<Card> deck = new List<Card>();
			foreach (Suit suit in Enum.GetValues(typeof(Suit)))
			{
				deck.AddRange(Enumerable.Range(9, 5).Prepend(1).Select(index => new Card
				{
					Value = index,
					Suit = suit.ToString(),
				}).ToArray());
			}
			return deck;
		}
	}
}
