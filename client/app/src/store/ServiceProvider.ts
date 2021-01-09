import { Action, Reducer } from "redux";
import { IWeatherService, WeatherService } from "./WeatherForecasts";
import {
  IGameplayService as IEucreService,
  GameplayService as EucreService,
} from "app/games/eucre/services";
import {
  ILobbyService as ILobbyService,
  LobbyService as LobbyService,
} from "app/services";

export interface ServiceProviderState {
  weather: IWeatherService;
  eucre: IEucreService;
  lobby: ILobbyService;
}

const unloadedState: ServiceProviderState = {
  weather: new WeatherService(process.env.REACT_APP_WEATHER_URL),
  eucre: new EucreService(
    process.env.REACT_APP_EUCRE_URL,
    process.env.REACT_APP_EUCRE_AUDIENCE
  ),
  lobby: new LobbyService(
    process.env.REACT_APP_LOBBY_URL,
    process.env.REACT_APP_EUCRE_AUDIENCE
  ),
};

export const reducer: Reducer<ServiceProviderState> = (
  state: ServiceProviderState | undefined,
  incomingAction: Action
): ServiceProviderState => {
  if (state === undefined) {
    return unloadedState;
  }

  return state;
};
