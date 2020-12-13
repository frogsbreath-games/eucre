﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging.Abstractions;
using Weather.Api.Controllers;
using Weather.Api.Models;
using Xunit;

namespace Weather.Tests.Unit.Controllers
{
	public class WeatherForecastControllerTests
	{
		[Fact]
		public void Get_ShouldReturnFive()
		{
			var controller = new WeatherForecastController(
				new NullLogger<WeatherForecastController>());

			IEnumerable<WeatherForecast> forecasts = controller.Get();

			Assert.Equal(5, forecasts.Count());
		}
	}
}
