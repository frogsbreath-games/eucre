using System.Collections.Generic;
using Games.Eucre.Api.Enums;

namespace Games.Eucre.Api.Models
{
	public class GameModel
	{
		public BoardStatus BoardStatus { get; set; }
		public string Description { get; set; } = string.Empty;
		public List<CardModel> Deck { get; set; } = new List<CardModel>();
		public int CurrentPlayerNumber { get; set; }
		public int TeamScore { get; set; }
		public int OpponentScore { get; set; }
		public int RoundNumber { get; set; }
		public int? TrickNumber { get; set; }
		public int Dealer { get; set; }
		public Suit? Trump { get; set; }
		public CardModel? PickupCard { get; set; }
		public int? LeadPlayer { get; set; }
		public HandModel PlayerHand { get; set; } = new HandModel(new List<CardModel>());
		public HandModel PartnerHand { get; set; } = new HandModel(new List<CardModel>());
		public HandModel LeftOpponentHand { get; set; } = new HandModel(new List<CardModel>());
		public HandModel RightOpponentHand { get; set; } = new HandModel(new List<CardModel>());
		public List<CardModel> Pile { get; set; } = new List<CardModel>();
	}
}
