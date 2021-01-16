using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Platform.Profile.Api.Domain.Models
{
	public class ProfileModel
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; } = null!;
		[JsonIgnore]
		public string? Auth0Id { get; set; }
		public string? Username { get; set; }
	}
}
