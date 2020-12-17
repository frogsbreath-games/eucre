import { Action, Reducer } from "redux";
import { IWeatherService, WeatherService } from "./WeatherForecasts";
import { IEucreService, EucreService } from "./Eucre";

export interface ServiceProviderState {
  weather: IWeatherService;
  eucre: IEucreService;
}

const unloadedState: ServiceProviderState = {
  weather: new WeatherService(process.env.REACT_APP_WEATHER_URL),
  eucre: new EucreService(process.env.REACT_APP_EUCRE_URL),
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
