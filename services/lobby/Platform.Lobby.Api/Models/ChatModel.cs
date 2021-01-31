
using System;

namespace Platform.Lobby.Api.Models
{
	public class ChatModel
	{
		public string? AuthorName { get; set; }
		public string? AuthorId { get; set; }
		public DateTimeOffset? TimeStamp { get; set; }
		public string? Message { get; set; }
    }

}
