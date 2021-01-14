using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.Profile.Api.Data.Repositories;
using Platform.Profile.Api.Domain.Models;
using WordGame.API.Application.Services;

namespace Platform.Profile.Api.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/profile")]
	[Produces("application/json"), Consumes("application/json")]
	public class ProfileController : ControllerBase
	{
		protected ProfileService _service;
		protected INameGenerator _nameGenerator;

		public ProfileController(
			ProfileService service, INameGenerator nameGenerator)
		{
			_service = service ?? throw new ArgumentNullException(nameof(service));
			_nameGenerator = nameGenerator ?? throw new ArgumentNullException(nameof(nameGenerator));
		}

		[HttpGet]
		public async Task<ProfileModel> GetProfile()
		{
			var profile = await _service.GetProfileById(User.Identity?.Name);
			if(profile == null)
			{
				profile = new ProfileModel { };
			}
			return profile;
		}

		[HttpGet("{id}")]
		public async Task<ProfileModel> GetProfileById([FromRoute] string id)
		{
			return await _service.GetProfileById(id);
		}

		[HttpPost]
		public async Task<ProfileModel> AddProfile(ProfileModel profile)
		{
			var newProfile = new ProfileModel
			{
				Auth0Id = User.Identity?.Name,
				Username = _nameGenerator.GetRandomName()
			};
			await _service.AddProfile(newProfile);
			return newProfile;
		}
	}
}
