import { Status, Visibility } from "app/types/enums";
import { Player } from "./Player";

export interface Lobby {
  code?: string;
  name?: string;
  visibility?: Visibility;
  status?: Status;
  players?: Player[];
}
