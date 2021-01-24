import { Card } from "./Card";
import { BoardStatus } from "./BoardStatus";
import { Hand } from "./Hand";

export interface Board {
  boardStatus: BoardStatus;
  description: string;
  deck: Card[];
  pile: Card[];
  playerHand: Hand;
  partnerHand: Hand;
  leftOpponentHand: Hand;
  rightOpponentHand: Hand;
}
