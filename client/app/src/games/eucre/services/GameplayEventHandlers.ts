import { Game } from "app/games/eucre/types";

export interface GameplayEventHandlers {
  gameUpdated: (game: Game) => void;
}