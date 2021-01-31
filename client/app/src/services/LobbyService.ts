import { Lobby } from "app/types/Lobby";
import { ILobbyService } from "./ILobbyService";
import { LobbyEventHandlers } from "./LobbyEventHandlers";
import ApiClient from "app/tools/ApiClient";
import HubClient from "app/tools/HubClient";
import { ChatMessage } from "app/types/ChatMessage";

export class LobbyService implements ILobbyService {
  private readonly _apiClient: ApiClient;
  private readonly _hubClient: HubClient;

  constructor(baseUrl: string | undefined, tokenAudience: string | undefined) {
    this._apiClient = new ApiClient([baseUrl, `api/lobby/`], tokenAudience);
    this._hubClient = new HubClient([baseUrl, `hub/lobby/`], tokenAudience);
  }

  public getLobby(): Promise<Lobby> {
    return this._apiClient.get<Lobby>(`current`);
  }

  public createLobby(): Promise<Lobby> {
    return this._apiClient.post<Lobby>();
  }

  public closeLobby(code: string): Promise<Lobby> {
    return this._apiClient.post<Lobby>(`${code}/close`);
  }

  public sendChat(message: ChatMessage): Promise<boolean> {
    return this._apiClient.post<boolean>(`chat`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  public connectToLobbyHub(handlers: LobbyEventHandlers) {
    this._hubClient.setupHub(`chatroom`, [[`chatSent`, handlers.chatSent]]);
  }
}
