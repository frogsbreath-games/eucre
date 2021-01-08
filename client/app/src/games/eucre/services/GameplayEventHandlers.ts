import { Game } from "app/games/eucre/types";

export interface GameplayEventHandlers {
  updateGame: (game: Game) => void;
}