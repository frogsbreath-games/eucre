import { Lobby } from "app/types/Lobby";
import { LobbyEventHandlers } from "./LobbyEventHandlers";

export interface ILobbyService {
  getLobby(): Promise<Lobby>;
  closeLobby(code: string): Promise<Lobby>;
  createLobby(): Promise<Lobby>;
  sendChat(message: string): Promise<boolean>;
  connectToLobbyHub(handlers: LobbyEventHandlers): void;
}
