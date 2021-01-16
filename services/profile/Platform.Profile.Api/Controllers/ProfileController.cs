using System;
using System.Collections.Generic;
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
			return await _service.GetProfileByAuth0Id(User.Identity!.Name!)
				?? new ProfileModel();
		}

		[HttpGet("{id}")]
		public async Task<ProfileModel?> GetProfileById([FromRoute] string id)
		{
			return await _service.GetProfileById(id);
		}

		[AllowAnonymous]
		[HttpGet("all")]
		public async Task<List<ProfileModel>> GetAll(
			[FromQuery] int skip = 0,
			[FromQuery] int take = 100)
		{
			return await _service.GetProfiles(skip, take);
		}

		[HttpPost]
		public async Task<ProfileModel> AddProfile()
		{
			var profile = new ProfileModel
			{
				Auth0Id = User.Identity?.Name,
				Username = _nameGenerator.GetRandomName()
			};
			return await _service.AddProfile(profile);
		}

		[HttpPost("{id}")]
		public async Task<bool> UpdateProfile([FromRoute] string id, ProfileModel profile)
		{
			await _service.UpdateProfile(id, profile);
			return true;
		}

		[AllowAnonymous]
		[HttpDelete("{id}")]
		public async Task<bool> DeleteProfile([FromRoute] string id)
		{
			await _service.DeleteProfile(id);
			return true;
		}
	}
}
