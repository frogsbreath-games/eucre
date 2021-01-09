using System.Threading.Tasks;
using Platform.Lobby.Api.Models;

namespace Platform.Lobby.Api.Clients
{
		public interface ILobbyClient
		{
			Task ChatSent(ChatModel state);
		}
}
