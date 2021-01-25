using System.Collections.Generic;
using System.Linq;
using Platform.Lobby.Api.Enums;

namespace Platform.Lobby.Api.Models
{
	public class LobbyModel
	{
		public LobbyModel(Data.Models.Lobby lobby)
		{
			Code = lobby.Code;
			Status = lobby.Status;
			Visibility = lobby.Visibility;
			Players = lobby.Players.Select(p => new PlayerModel(p)).ToList();
			LobbyMessages = lobby.LobbyMessages.Select(m => new ChatModel { AuthorID = m.AuthorId, Message = m.Message, TimeStamp = m.TimeStamp }).ToList();
		}
		public string? Code { get; set; }
		public string? Name { get; set; }
		public Visibility? Visibility { get; set; }
		public Status? Status { get; set; }
		public List<PlayerModel> Players { get; set; }
		public List<ChatModel> LobbyMessages { get; set; }
	}
}
