import { Action, Reducer } from "redux";
import { ApplicationState, AppThunkAction } from "./";
import ApiClient from "app/tools/ApiClient";
import { setupSignalRConnection } from "app/utils/setupSignalRConnection";

export interface EucreState {
  deck: Card[];
  isLoading: boolean;
}

export type Suit = 'Hearts' | 'Clubs' | 'Spades' | 'Diamonds';

export interface Card {
  value: number;
  suit: Suit;
}

export interface IEucreService {
  getEucreDeck(): Promise<Card[]>;
  shuffleDeck(): Promise<boolean>;
}

export class EucreService implements IEucreService {
  private readonly _client: ApiClient;

  constructor(baseUrl?: string | undefined) {
    this._client = new ApiClient(baseUrl, `api/eucre/`);
  }

  public getEucreDeck(): Promise<Card[]> {
    return this._client.fetchJson<Card[]>(`deck`);
  }

  public shuffleDeck(): Promise<boolean> {
    return this._client.fetchJson<boolean>(`shuffle`, { method: "post" });
  }
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestDeckAction {
  type: "REQUEST_EUCRE_DECK";
}

interface ReceiveDeckAction {
  type: "RECEIVE_EUCRE_DECK";
  deck: Card[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestDeckAction | ReceiveDeckAction;

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
      UpdateGame: (state: EucreState) => ({
        type: "RECEIVE_EUCRE_DECK",
        deck: state.deck
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
      appState.services.eucre.getEucreDeck().then((data) => {
        dispatch({
          type: "RECEIVE_EUCRE_DECK",
          deck: data,
        });
      });
      dispatch({
        type: "REQUEST_EUCRE_DECK",
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
        type: "REQUEST_EUCRE_DECK",
      });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EucreState = {
  deck: [],
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
    case "REQUEST_EUCRE_DECK":
      return {
        deck: state.deck,
        isLoading: true,
      };
    case "RECEIVE_EUCRE_DECK":
      return {
        deck: action.deck,
        isLoading: false,
      };
    default:
      return state;
  }
};
