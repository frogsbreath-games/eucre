using Platform.Lobby.Api.Enums;

namespace Platform.Lobby.Api.Models
{
	public class PlayerModel
	{
		public string Id { get; set; } = null!;
		public Role Role { get; set; }
	}
}
