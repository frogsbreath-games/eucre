using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Games.Eucre.Api.Enums;
using Games.Eucre.Api.Models;
using Games.Eucre.Api.Services;
using Games.Eucre.Api.Utilities;
using Games.Eucre.Api.Workflow;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Games.Eucre.Api.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/eucre/game")]
	[Produces("application/json"), Consumes("application/json")]
	public class GameController : ControllerBase
	{
		private readonly RandomAccessor _randomAccessor;
		private readonly GameUpdater _gameUpdater;

		public GameController(
			RandomAccessor randomAccessor,
			GameUpdater gameUpdater)
		{
			_randomAccessor = randomAccessor ?? throw new ArgumentNullException(nameof(randomAccessor));
			_gameUpdater = gameUpdater ?? throw new ArgumentNullException(nameof(gameUpdater));
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

		[HttpGet]
		public async Task<GameModel> GetEucreGame()
		{
			GameModel? maybeGame = await _gameUpdater.GetGameModel();

			if (maybeGame is GameModel game)
				return game;

			game = Gameplay.CreateGame();

			await _gameUpdater.SaveGame(game);

			return game;
		}

		[HttpPost("shuffle")]
		public async Task<bool> Shuffle()
		{
			GameModel? maybeGame = await _gameUpdater.GetGameModel();

			if (maybeGame is not GameModel game)
				return false;

			game = Gameplay.Randomize(game, User, _randomAccessor.Random);

			await _gameUpdater.SaveGame(game);

			return true;
		}

		[HttpPost("play")]
		public async Task<bool> Play(CardModel card)
		{
			GameModel? maybeGame = await _gameUpdater.GetGameModel();

			if (maybeGame is not GameModel game)
				return false;

			game = Gameplay.PlayCard(game, card, User, _randomAccessor.Random);

			await _gameUpdater.SaveGame(game);

			return true;
		}
	}
}
