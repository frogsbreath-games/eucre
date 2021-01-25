using System;

namespace Platform.Lobby.Api.Data.Models
{
	public class ChatMessage
	{
		public string? AuthorId { get; set; }
		public DateTimeOffset? TimeStamp { get; set; }
		public string? Message { get; set; }
	}
}
