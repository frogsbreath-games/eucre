using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Platform.Lobby.Api.Clients;

namespace Platform.Lobby.Api.Hubs
{
	[Authorize]
	public class LobbyHub : Hub<ILobbyClient>
	{
		protected string GroupName => "lobby"; //TODO - unique per game instance

		public override async Task OnConnectedAsync()
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, GroupName);
			await base.OnConnectedAsync();
		}

		public override async Task OnDisconnectedAsync(Exception? exception)
		{
			await Groups.RemoveFromGroupAsync(Context.ConnectionId, GroupName);
			await base.OnDisconnectedAsync(exception);
		}
	}
}
