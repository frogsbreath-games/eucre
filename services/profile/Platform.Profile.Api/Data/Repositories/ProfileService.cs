using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Platform.Profile.Api.Configuration;
using Platform.Profile.Api.Domain.Models;

namespace Platform.Profile.Api.Data.Repositories
{
	public class ProfileService
	{
		protected IMongoCollection<ProfileModel> _profiles;

		public ProfileService(IMongoDbSettings settings)
		{
			var client = new MongoClient(settings.ConnectionString);
			var database = client.GetDatabase(settings.DatabaseName);

			_profiles = database.GetCollection<ProfileModel>("profile");
		}

		public async Task<ProfileModel> AddProfile(ProfileModel profile)
		{
			await _profiles.InsertOneAsync(profile);
			return profile;
		}

		public async Task<ProfileModel?> GetProfileById(string Id)
		{
			return await _profiles.Find(x => x.Id == Id)
				.SingleOrDefaultAsync();
		}

		public async Task<List<ProfileModel>> GetProfiles(int skip, int take)
		{
			return await _profiles.Find(x => true)
				.Skip(skip)
				.Limit(take)
				.ToListAsync();
		}

		public async Task<ProfileModel?> GetProfileByAuth0Id(string Id)
		{
			return await _profiles.Find(x => x.Auth0Id == Id)
				.SingleOrDefaultAsync();
		}

		public async Task<ReplaceOneResult> UpdateProfile(string Id, ProfileModel profile)
		{
			return await _profiles.ReplaceOneAsync(
				x => x.Id == Id,
				profile);
		}

		public async Task<DeleteResult> DeleteProfile(string Id)
		{
			return await _profiles.DeleteOneAsync(x => x.Id == Id);
		}
	}
}
