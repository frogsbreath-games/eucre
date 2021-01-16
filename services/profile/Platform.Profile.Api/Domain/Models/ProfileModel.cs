using System.Text.Json.Serialization;
using MongoDB.Bson;

namespace Platform.Profile.Api.Domain.Models
{
	public class ProfileModel
	{
		[JsonIgnore]
		public ObjectId Id { get; set; }
		public string? Auth0Id { get; set; }
		public string? Username { get; set; }
	}
}
