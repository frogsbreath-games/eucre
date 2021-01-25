using Platform.Lobby.Api.Enums;

namespace Platform.Lobby.Api.Data.Models
{
	public record Player
	{	
		public Player(Player player)
		{
			Auth0Id = player.Auth0Id;
			Role = player.Role;
		}
		public string? Auth0Id { get; set; } = null!;
		public Role Role { get; set; }
	}
}
