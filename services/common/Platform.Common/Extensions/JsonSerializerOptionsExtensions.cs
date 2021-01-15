using System.Text.Json;
using System.Text.Json.Serialization;

namespace Platform.Common.Extensions
{
	public static class JsonSerializerOptionsExtensions
	{
		public static JsonSerializerOptions ConfigureJson(this JsonSerializerOptions options)
		{
			options.Converters.Add(new JsonStringEnumConverter());
			return options;
		}
	}
}
