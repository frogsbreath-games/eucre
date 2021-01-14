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

		public async Task AddProfile(ProfileModel profile)
		{
			await _profiles.InsertOneAsync(profile);
		}

		public async Task<ProfileModel> GetProfileById(string code)
		{
			//Temporary First will return back to single or default
			return await _profiles.Find(x => x.Auth0Id == code)
				.FirstOrDefaultAsync();
		}
	}
}
