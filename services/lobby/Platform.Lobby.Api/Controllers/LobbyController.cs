using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Platform.Lobby.Api.Clients;
using Platform.Lobby.Api.Data.Models;
using Platform.Lobby.Api.Enums;
using Platform.Lobby.Api.Hubs;
using Platform.Lobby.Api.Models;
using Platform.Lobby.Api.Services;

namespace Platform.Lobby.Api.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/lobby")]
	[Produces("application/json"), Consumes("application/json")]
	public class LobbyController : ControllerBase
	{
		protected LobbyService _service;
		private readonly IHubContext<LobbyHub, ILobbyClient> _hubContext;

		public LobbyController(
			IHubContext<LobbyHub, ILobbyClient> hubContext, LobbyService service)
		{
			_service = service ?? throw new ArgumentNullException(nameof(service));
			_hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
		}

		[HttpGet("current")]
		public async Task<LobbyModel> GetCurrentLobby()
		{

			Data.Models.Lobby? lobby = await _service.GetOpenLobbyForPlayer(User.Identity!.Name! ?? throw new ArgumentNullException("Not Authorized"));

			return new LobbyModel(lobby ?? new Data.Models.Lobby());
		}

		[HttpPost]
		public async Task<LobbyModel> Add()
		{

			Data.Models.Lobby lobby = new Data.Models.Lobby
			{
				Code = Guid.NewGuid().ToString().Substring(0, 6).ToUpper(),
				Players = new List<Player> { new Player { Auth0Id = User.Identity!.Name!, Role = Enums.Role.Owner } },
				Visibility = Visibility.Public,
				Status = Status.InLobby
			};

			await _service.AddLobby(lobby);

			return new LobbyModel(lobby);
		}

		[HttpPost("{code}/start")]
		public async Task<LobbyModel> StartGame([FromRoute] string code)
		{
			Data.Models.Lobby lobby = await _service.GetLobbyByCode(code) ?? new Data.Models.Lobby();
			lobby.Status = Status.InGame;
			await _service.UpdateLobby(lobby.Id, lobby);
			return new LobbyModel(lobby);
		}

		[HttpPost("{code}/close")]
		public async Task<LobbyModel> CloseLobby([FromRoute] string code)
		{
			Data.Models.Lobby lobby = await _service.GetLobbyByCode(code) ?? new Data.Models.Lobby();
			lobby.Status = Status.Closed;
			await _service.UpdateLobby(lobby.Id, lobby);
			return new LobbyModel(lobby);
		}

		[HttpPost("chat")]
		public async Task<bool> SentChat(ChatModel message)
		{
			var chat = new ChatMessage
			{
				AuthorId = User?.Identity?.Name ?? "Anonymous",
				Message = message.Message,
				TimeStamp = DateTimeOffset.UtcNow
			};

			Data.Models.Lobby lobby = await _service.GetOpenLobbyForPlayer(User?.Identity!.Name!) ?? new Data.Models.Lobby();

			lobby.LobbyMessages.Add(new ChatMessage { AuthorId = User.Identity!.Name, TimeStamp = message.TimeStamp, Message = message.Message });

			await _service.UpdateLobby(lobby.Id, lobby);

			await _hubContext.Clients.All.ChatSent(new ChatModel { AuthorID = chat.AuthorId, TimeStamp = chat.TimeStamp, Message = chat.Message });

			return true;
		}

		[HttpGet("{code}")]
		public async Task<LobbyModel?> GetByCode([FromRoute] string code)
		{
			Data.Models.Lobby lobby = await _service.GetLobbyByCode(code) ?? new Data.Models.Lobby();
			return new LobbyModel(lobby);
		}

		[AllowAnonymous]
		[HttpGet]
		public async Task<List<LobbyModel>> GetAll(
			[FromQuery] int skip = 0,
			[FromQuery] int take = 100)
		{
			List<Data.Models.Lobby> lobbies = await _service.GetLobbies(skip, take);
			return lobbies.Select(l => new LobbyModel(l)).ToList();
		}

		[HttpPut("{id}")]
		public async Task<bool> Update([FromRoute] string id, LobbyModel lobby)
		{
			Data.Models.Lobby updateLobby = new Data.Models.Lobby
			{
				Code = Guid.NewGuid().ToString().Substring(0, 6).ToUpper(),
				Players = lobby.Players.Select(p => new Player { Auth0Id = p.Auth0Id, Role = p.Role }).ToList(),
				Visibility = lobby.Visibility,
				Status = lobby.Status,
				LobbyMessages = lobby.LobbyMessages.Select(c => new ChatMessage { AuthorId = c.AuthorID, Message = c.Message, TimeStamp = c.TimeStamp }).ToList()
			};

			await _service.UpdateLobby(id, updateLobby);
			return true;
		}

		[AllowAnonymous]
		[HttpDelete("{code}")]
		public async Task<bool> Delete([FromRoute] string code)
		{
			await _service.DeleteLobbyByCode(code);
			return true;
		}
	}
}
