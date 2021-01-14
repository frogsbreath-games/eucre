using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WordGame.API.Domain.Models;

namespace WordGame.API.Extensions
{
	public static class ClaimsPrincipalExtensions
	{
		public static Guid GetPlayerId(this ClaimsPrincipal principal)
		{
			return Guid.Parse(principal.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
		}

		public static Player GetPlayer(this ClaimsPrincipal principal, Game game)
		{
			return game.Players.Single(p => p.Id == principal.GetPlayerId());
		}

		public static string GetGameCode(this ClaimsPrincipal principal)
		{
			return principal.Claims.Single(x => x.Type == "Game").Value;
		}

	}
}
