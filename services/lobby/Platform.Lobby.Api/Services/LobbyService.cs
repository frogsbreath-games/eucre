using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using Platform.Lobby.Api.Configuration;
using Platform.Lobby.Api.Enums;

namespace Platform.Lobby.Api.Services
{
	public class LobbyService
	{
		protected IMongoCollection<Data.Models.Lobby> _lobbies;

		public LobbyService(IMongoDbSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_lobbies = database.GetCollection<Data.Models.Lobby>("lobby");
		}

		public async Task AddLobby(Data.Models.Lobby lobby)
		{
			await _lobbies.InsertOneAsync(lobby);
		}

		public async Task<Data.Models.Lobby?> GetLobbyById(string Id)
		{
			return await _lobbies.Find(x => x.Id == Id)
				.SingleOrDefaultAsync();
		}

		public async Task<Data.Models.Lobby?> GetOpenLobbyForPlayer(string auth0Id)
		{
			return await _lobbies.Find(x => x.Status != Status.Closed && x.Players.Any(p => p.Auth0Id == auth0Id))
				.SingleOrDefaultAsync();
		}

		public async Task<List<Data.Models.Lobby>> GetLobbies(int skip, int take)
		{
			return await _lobbies.Find(x => true)
				.Skip(skip)
				.Limit(take)
				.ToListAsync();
		}

		public async Task<Data.Models.Lobby?> GetLobbyByCode(string code)
		{
			return await _lobbies.Find(x => x.Code == code)
				.SingleOrDefaultAsync();
		}

		public async Task<ReplaceOneResult> UpdateLobby(string Id, Data.Models.Lobby lobby)
		{
			return await _lobbies.ReplaceOneAsync(
				x => x.Id == Id,
				lobby);
		}

		public async Task<DeleteResult> DeleteLobby(string Id)
		{
			return await _lobbies.DeleteOneAsync(x => x.Id == Id);
		}

		public async Task<DeleteResult> DeleteLobbyByCode(string code)
		{
			return await _lobbies.DeleteOneAsync(x => x.Code == code);
		}
	}
}
