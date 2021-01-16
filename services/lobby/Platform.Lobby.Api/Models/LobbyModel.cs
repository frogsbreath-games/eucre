using System.Collections.Generic;
using Platform.Lobby.Api.Enums;

namespace Platform.Lobby.Api.Models
{
	public class LobbyModel
	{
		public string? Code { get; set; }
		public string? Name { get; set; }
		public Visibility? Visibility { get; set; }
		public Status? Status { get; set; }
		public List<PlayerModel>? Players { get; set; }
		public List<ChatModel>? LobbyMessages { get; set; }
	}
}
