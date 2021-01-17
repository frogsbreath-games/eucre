using System;
using System.Threading.Tasks;
using Games.Eucre.Api.Models;
using Games.Eucre.Api.Services;
using Games.Eucre.Api.Workflow;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.Common.Utilities;

namespace Games.Eucre.Api.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/eucre/game")]
	[Produces("application/json"), Consumes("application/json")]
	public class GameController : ControllerBase
	{
		private readonly IRandomAccessor _randomAccessor;
		private readonly GameUpdater _gameUpdater;

		public GameController(
			IRandomAccessor randomAccessor,
			GameUpdater gameUpdater)
		{
			_randomAccessor = randomAccessor ?? throw new ArgumentNullException(nameof(randomAccessor));
			_gameUpdater = gameUpdater ?? throw new ArgumentNullException(nameof(gameUpdater));
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

			if (maybeGame is null)
				return false;

			GameModel game = maybeGame;

			game = Gameplay.PlayCard(game, card, User, _randomAccessor.Random);

			await _gameUpdater.SaveGame(game);

			return true;
		}
	}
}
