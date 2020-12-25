﻿using System.Text.Json.Serialization;
using Games.Eucre.Api.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Games.Eucre.Api
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors();
			services.AddControllers().AddJsonOptions(c =>
			{
				c.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
			});

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "Games.Eucre.Api", Version = "v1" });
			});

			services.AddSignalR().AddJsonProtocol(c =>
			{
				c.PayloadSerializerOptions.Converters.Add(new JsonStringEnumConverter());
			});

			services.AddScoped<IMongoClient, MongoClient>(provider =>
				new MongoClient(Configuration.GetConnectionString("MongoDb")));

			var camelCase = new ConventionPack { new CamelCaseElementNameConvention() };
			var enumString = new ConventionPack { new EnumRepresentationConvention(BsonType.String) };

			ConventionRegistry.Register(nameof(camelCase), camelCase, x => true);
			ConventionRegistry.Register(nameof(enumString), enumString, x => true);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseSwagger();
				app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Games.Eucre.Api v1"));
			}

			app.UseCors(options =>
			{
				options
					.AllowAnyHeader()
					.AllowAnyMethod()
					.AllowCredentials()
					.WithOrigins(
						"http://localhost:3000",
						"http://localhost:3001",
						"http://localhost:5080",
						"http://host.docker.internal:5080");
			});

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapHub<GameplayHub>("hub/eucre/game");
				endpoints.MapControllers();
			});
		}
	}
}
