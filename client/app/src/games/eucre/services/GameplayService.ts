import { Card, Game } from "app/games/eucre/types";
import { IGameplayService } from "./IGameplayService";
import { GameplayEventHandlers } from "./GameplayEventHandlers";
import ApiClient from "app/tools/ApiClient";
import HubClient from "app/tools/HubClient";


export class GameplayService implements IGameplayService {
  private readonly _apiClient: ApiClient;
  private readonly _hubClient: HubClient;

  constructor(baseUrl: string | undefined, tokenAudience: string | undefined) {
    this._apiClient = new ApiClient([baseUrl, `api/eucre/`], tokenAudience);
    this._hubClient = new HubClient([baseUrl, `hub/eucre/`], tokenAudience);
  }

  public getEucreGame(): Promise<Game> {
    return this._apiClient.get<Game>(`game`);
  }

  public shuffleDeck(): Promise<boolean> {
    return this._apiClient.post<boolean>(`shuffle`, { body: null });
  }

  public playCard(card: Card): Promise<boolean> {
    return this._apiClient.post<boolean>(`play`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
  }

  public connectToGameHub(handlers: GameplayEventHandlers) {
    this._hubClient.setupHub(`game`, [[`updateGame`, handlers.updateGame]]);
  }
}