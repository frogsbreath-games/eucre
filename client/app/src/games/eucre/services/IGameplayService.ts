import { Card, Game } from "app/games/eucre/types";
import { GameplayEventHandlers } from "./GameplayEventHandlers";

export interface IGameplayService {
  getEucreGame(): Promise<Game>;
  shuffleDeck(): Promise<boolean>;
  playCard(card: Card): Promise<boolean>;
  connectToGameHub(handlers: GameplayEventHandlers): void;
}