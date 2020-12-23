﻿using System.Threading.Tasks;
using Games.Eucre.Api.Models;

namespace Games.Eucre.Api.Clients
{
	public interface IGameplayClient
	{
		Task UpdateGame(GameModel state);
	}
}
