import { Lobby } from "app/types/Lobby";
import { LobbyEventHandlers } from "./LobbyEventHandlers";

export interface ILobbyService {
  getLobby(): Promise<Lobby>;
  sendChat(message: string): Promise<boolean>;
  connectToLobbyHub(handlers: LobbyEventHandlers): void;
}
