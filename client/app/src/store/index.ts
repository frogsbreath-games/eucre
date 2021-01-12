import * as WeatherForecasts from "./WeatherForecasts";
import * as Counter from "./Counter";
import * as ServiceProvider from "./ServiceProvider";
import * as Eucre from "./Eucre";
import * as Lobby from "./Lobby";
import * as Profile from "./Profile";

// The top-level state object
export interface ApplicationState {
  services: ServiceProvider.ServiceProviderState;
  counter: Counter.CounterState | undefined;
  weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
  eucre: Eucre.EucreState | undefined;
  lobby: Lobby.LobbyState | undefined;
  profile: Profile.ProfileState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  services: ServiceProvider.reducer,
  counter: Counter.reducer,
  weatherForecasts: WeatherForecasts.reducer,
  eucre: Eucre.reducer,
  lobby: Lobby.reducer,
  profile: Profile.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
