using Platform.Lobby.Api.Enums;

namespace Platform.Lobby.Api.Models
{
	public class PlayerModel
	{
		public PlayerModel(Data.Models.Player player)
		{
			Auth0Id = player.Auth0Id;
			Role = player.Role;
		}
		public string? Auth0Id { get; set; }
		public Role Role { get; set; }
	}
}
