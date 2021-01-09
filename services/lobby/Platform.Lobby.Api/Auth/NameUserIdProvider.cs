using Microsoft.AspNetCore.SignalR;

namespace Platform.Lobby.Api.Auth
{
	public class NameUserIdProvider : IUserIdProvider
	{
		public string? GetUserId(HubConnectionContext connection)
		{
			return connection.User?.Identity?.Name;
		}
	}
}
