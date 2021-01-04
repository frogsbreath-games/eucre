import { Action, Reducer } from "redux";
import { AppThunkAction } from "./";
import ApiClient from "app/tools/ApiClient";
import HubClient from "app/tools/HubClient";
import { Types as EucreTypes } from "app/games/eucre";

export interface EucreState {
  game: EucreTypes.Game;
  isLoading: boolean;
}

export interface IEucreService {
  getEucreGame(): Promise<EucreTypes.Game>;
  shuffleDeck(): Promise<boolean>;
  playCard(card: EucreTypes.Card): Promise<boolean>;
  connectToGameHub(handlers: EucreEventHandlers): void;
}

export interface EucreEventHandlers {
  updateGame: (game: EucreTypes.Game) => void;
}

export class EucreService implements IEucreService {
  private readonly _apiClient: ApiClient;
  private readonly _hubClient: HubClient;

  constructor(baseUrl: string | undefined, tokenAudience: string | undefined) {
    this._apiClient = new ApiClient([baseUrl, `api/eucre/`], tokenAudience);
    this._hubClient = new HubClient([baseUrl, `hub/eucre/`], tokenAudience);
  }

  public getEucreGame(): Promise<EucreTypes.Game> {
    return this._apiClient.get<EucreTypes.Game>(`game`);
  }

  public shuffleDeck(): Promise<boolean> {
    return this._apiClient.post<boolean>(`shuffle`, { body: null });
  }

  public playCard(card: EucreTypes.Card): Promise<boolean> {
    return this._apiClient.post<boolean>(`play`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
  }

  public connectToGameHub(handlers: EucreEventHandlers) {
    this._hubClient.setupHub(`game`, [[`updateGame`, handlers.updateGame]]);
  }
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestGameAction {
  type: "REQUEST_EUCRE_GAME";
}

interface PlayCardAction {
  type: "PLAY_CARD_ACTION";
  card: EucreTypes.Card;
}

interface ReceiveGameAction {
  type: "RECEIVE_EUCRE_GAME";
  game: EucreTypes.Game;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestGameAction | ReceiveGameAction | PlayCardAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  enterGame: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState && appState.eucre) {
      appState.services.eucre.connectToGameHub({
        updateGame: (game: EucreTypes.Game) => {
          dispatch({
            type: "RECEIVE_EUCRE_GAME",
            game: game,
          });
        },
      });
    }
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
  shuffle: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
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

  play: (card: EucreTypes.Card): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.eucre) {
      appState.services.eucre.playCard(card).then((data) => {
        console.log("played");
      });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EucreState = {
  game: {
    description: ``,
    deck: [],
    pile: [],
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
