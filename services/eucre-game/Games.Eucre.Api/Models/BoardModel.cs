using System.Collections.Generic;
using Games.Eucre.Api.Enums;

namespace Games.Eucre.Api.Models
{
	public record BoardModel
	{
		public BoardStatus BoardStatus { get; init; }
		public string Description { get; init; } = string.Empty;
		public List<CardModel> Deck { get; init; } = new List<CardModel>();
		public int CurrentPlayerNumber { get; init; }
		public int TeamScore { get; init; }
		public int OpponentScore { get; init; }
		public int RoundNumber { get; init; }
		public int? TrickNumber { get; init; }
		public int Dealer { get; init; }
		public Suit? Trump { get; init; }
		public CardModel? PickupCard { get; init; }
		public int? LeadPlayer { get; init; }
		public HandModel PlayerHand { get; init; } = new HandModel(new List<CardModel>());
		public HandModel PartnerHand { get; init; } = new HandModel(new List<CardModel>());
		public HandModel LeftOpponentHand { get; init; } = new HandModel(new List<CardModel>());
		public HandModel RightOpponentHand { get; init; } = new HandModel(new List<CardModel>());
		public List<CardModel> Pile { get; init; } = new List<CardModel>();
	}
}
