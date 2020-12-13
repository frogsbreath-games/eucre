using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Weather.Api;
using Weather.Api.Models;
using Xunit;

namespace Weather.Tests.Integration
{
	public class WeatherForecastTests : IClassFixture<WebApplicationFactory<Startup>>
	{
		private readonly WebApplicationFactory<Startup> _factory;

		public WeatherForecastTests(WebApplicationFactory<Startup> factory)
		{
			_factory = factory;
		}

		[Fact]
		public async Task Get_ShouldReturnFiveForecasts()
		{
			var client = _factory.CreateClient();

			var response = await client.GetFromJsonAsync<WeatherForecast[]>(
				"weatherForecast");

			Assert.Equal(5, response.Length);
		}
	}
}
