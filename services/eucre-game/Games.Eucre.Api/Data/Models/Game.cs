using Games.Eucre.Api.Enums;
using MongoDB.Bson;

namespace Games.Eucre.Api.Data.Models
{
	public record Game(
		BoardStatus Status,
		User[] Spectators,
		Player[] Players,
		Round[] Rounds)
	{
		public ObjectId Id { get; private set; }
	}
}
