using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Platform.Profile.Api.Data.Repositories;
using Platform.Profile.Api.Domain.Models;

namespace Platform.Profile.Api.Controllers
{
	[ApiController]
	[Route("api/profile")]
	[Produces("application/json"), Consumes("application/json")]
	public class ProfileController : ControllerBase
	{
		protected ProfileService _service;

		public ProfileController(
			ProfileService service)
		{
			_service = service ?? throw new ArgumentNullException(nameof(service));
		}

		[HttpGet]
		public async Task<ProfileModel> GetProfile()
		{
			return await _service.GetProfileById(User.Identity?.Name);
		}

		[HttpPost]
		public async Task<bool> AddProfile()
		{
			await _service.AddProfile(new ProfileModel
			{
				Auth0Id = User.Identity?.Name
			}
			);
			return true;
		}
	}
}
