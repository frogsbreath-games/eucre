using Games.Eucre.Api.Enums;

namespace Games.Eucre.Api.Extensions
{
	public static class PlayerNumberExtensions
	{
		public static PlayerNumber NextPlayer(this PlayerNumber player)
		{
			return (PlayerNumber)(((int)player + 1) % 4);
		}
	}
}
