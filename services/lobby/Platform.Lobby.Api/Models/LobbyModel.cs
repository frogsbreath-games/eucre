using System.Collections.Generic;
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
			Players = lobby.Players.ConvertAll(p => new PlayerModel(p));
			LobbyMessages = lobby.LobbyMessages.ConvertAll(m => new ChatModel
			{
				AuthorName = m.AuthorName,
				AuthorId = m.AuthorId,
				Message = m.Message,
				TimeStamp = m.TimeStamp
			});
		}
		public string? Code { get; set; }
		public string? Name { get; set; }
		public Visibility? Visibility { get; set; }
		public Status? Status { get; set; }
		public List<PlayerModel> Players { get; set; }
		public List<ChatModel> LobbyMessages { get; set; }
	}
}
