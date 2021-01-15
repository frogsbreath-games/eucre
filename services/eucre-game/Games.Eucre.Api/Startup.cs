using System.Security.Claims;
using System.Threading.Tasks;
using Games.Eucre.Api.Auth;
using Games.Eucre.Api.Hubs;
using Games.Eucre.Api.Services;
using Games.Eucre.Api.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using Platform.Common.Extensions;

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
				c.JsonSerializerOptions.ConfigureJson();
			});

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "Games.Eucre.Api", Version = "v1" });
			});

			services.AddSignalR().AddJsonProtocol(c =>
			{
				c.PayloadSerializerOptions.ConfigureJson();
			});

			services.AddScoped<IMongoClient, MongoClient>(provider =>
				new MongoClient(Configuration.GetConnectionString("MongoDb")));

			var camelCase = new ConventionPack { new CamelCaseElementNameConvention() };
			var enumString = new ConventionPack { new EnumRepresentationConvention(BsonType.String) };

			ConventionRegistry.Register(nameof(camelCase), camelCase, x => true);
			ConventionRegistry.Register(nameof(enumString), enumString, x => true);

			string domain = $"https://{Configuration["Auth0:Domain"]}/";
			services
				.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.Authority = domain;
					options.Audience = Configuration["Auth0:Audience"];
					// If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`. Map it to a different claim by setting the NameClaimType below.
					options.TokenValidationParameters = new TokenValidationParameters
					{
						NameClaimType = ClaimTypes.NameIdentifier
					};

					options.Events = new JwtBearerEvents
					{
						OnMessageReceived = context =>
						{
							var accessToken = context.Request.Query["access_token"];

							var path = context.HttpContext.Request.Path;

							if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hub"))
								context.Token = accessToken;

							return Task.CompletedTask;
						}
					};
				});

			services.AddAuthorization(options =>
			{
				options.AddPolicy("read:messages", policy => policy.Requirements.Add(new HasScopeRequirement("read:messages", domain)));
			});

			services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

			services.AddSingleton<IUserIdProvider, NameUserIdProvider>();

			services.AddScoped<RandomAccessor>();
			services.AddSingleton<GameUpdater>();
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

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapHub<GameplayHub>("hub/eucre/game");
				endpoints.MapControllers();
			});
		}
	}
}
