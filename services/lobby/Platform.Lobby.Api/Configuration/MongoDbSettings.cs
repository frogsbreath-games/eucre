﻿namespace Platform.Lobby.Api.Configuration
{
	public class MongoDbSettings : IMongoDbSettings
	{
		public string ConnectionString { get; set; } = string.Empty;
		public string ProfileDatabaseName { get; set; } = string.Empty;

		public string DatabaseName { get; set; } = string.Empty;
	}

	public interface IMongoDbSettings
	{
		string ConnectionString { get; set; }
		string ProfileDatabaseName { get; set; }
		string DatabaseName { get; set; }
	}
}
