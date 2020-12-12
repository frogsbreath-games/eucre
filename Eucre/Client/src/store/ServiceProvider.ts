import { Action, Reducer } from "redux";
import { IWeatherService, WeatherService } from "./WeatherForecasts";

export interface ServiceProviderState {
  weather: IWeatherService;
}

const unloadedState: ServiceProviderState = {
  weather : new WeatherService(process.env.REACT_APP_WEATHER_URL)
};

export const reducer: Reducer<ServiceProviderState> = (
  state: ServiceProviderState | undefined,
  incomingAction: Action
): ServiceProviderState  => {
  if (state === undefined) {
    return unloadedState;
  }

  return state;
};
