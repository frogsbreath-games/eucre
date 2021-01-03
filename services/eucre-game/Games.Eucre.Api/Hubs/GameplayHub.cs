using System;
using System.Threading.Tasks;
using Games.Eucre.Api.Clients;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Games.Eucre.Api.Hubs
{
	[Authorize]
	public class GameplayHub : Hub<IGameplayClient>
	{
		protected string GroupName => "eucre"; //TODO - unique per game instance

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
