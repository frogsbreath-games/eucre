import { Action, Reducer } from "redux";
import { ApplicationState, AppThunkAction } from "./";
import ApiClient from "app/tools/ApiClient";
import { setupSignalRConnection } from "app/utils/setupSignalRConnection";

export interface EucreState {
  game: Game;
  isLoading: boolean;
}

export interface Game {
  deck: Card[];
}

export type Suit = 'Hearts' | 'Clubs' | 'Spades' | 'Diamonds';

export interface Card {
  value: number;
  suit: Suit;
}

export interface IEucreService {
  getEucreGame(): Promise<Game>;
  shuffleDeck(): Promise<boolean>;
}

export class EucreService implements IEucreService {
  private readonly _client: ApiClient;

  constructor(baseUrl?: string | undefined) {
    this._client = new ApiClient(baseUrl, `api/eucre/`);
  }

  public getEucreGame(): Promise<Game> {
    return this._client.fetchJson<Game>(`game`);
  }

  public shuffleDeck(): Promise<boolean> {
    return this._client.fetchJson<boolean>(`shuffle`, { method: "post" });
  }
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestGameAction {
  type: "REQUEST_EUCRE_GAME";
}

interface ReceiveGameAction {
  type: "RECEIVE_EUCRE_GAME";
  game: Game;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestGameAction | ReceiveGameAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  enterGame: (): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const connectionHub = process.env.REACT_APP_EUCRE_URL
      ? process.env.REACT_APP_EUCRE_URL + 'hub/eucre/game'
      : '/hub/eucre/game';

    const setupEventsHub = setupSignalRConnection<KnownAction, ApplicationState>(connectionHub, {
      UpdateGame: (game: Game) => ({
        type: "RECEIVE_EUCRE_GAME",
        game: game
      })
    });

    setupEventsHub(dispatch, getState);
  },
  requestEucreCards: (): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.eucre) {
      appState.services.eucre.getEucreGame().then((data) => {
        dispatch({
          type: "RECEIVE_EUCRE_GAME",
          game: data,
        });
      });
      dispatch({
        type: "REQUEST_EUCRE_GAME",
      });
    }
  },
  shuffle: (): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.eucre) {
      appState.services.eucre.shuffleDeck().then((data) => {
        console.log("shuffled");
      });
      dispatch({
        type: "REQUEST_EUCRE_GAME",
      });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EucreState = {
  game: {
    deck: []
  },
  isLoading: false,
};

export const reducer: Reducer<EucreState> = (
  state: EucreState | undefined,
  incomingAction: Action
): EucreState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_EUCRE_GAME":
      return {
        game: state.game,
        isLoading: true,
      };
    case "RECEIVE_EUCRE_GAME":
      return {
        game: action.game,
        isLoading: false,
      };
    default:
      return state;
  }
};
