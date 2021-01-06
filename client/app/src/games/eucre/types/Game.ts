import { Card } from "./Card";
import { BoardStatus } from "./BoardStatus";

export interface Game {
  boardStatus: BoardStatus;
  description: string;
  deck: Card[];
  pile: Card[];
}
