
using System;

namespace Platform.Lobby.Api.Models
{
	public class ChatModel
	{
		public string? AuthorID { get; set; }
		public DateTimeOffset? TimeStamp { get; set; }
		public string? Message { get; set; }
    }

}
