import { Action, Reducer } from "redux";
import { AppThunkAction } from "./";
import { Types as EucreTypes } from "app/games/eucre";

export interface EucreState {
  game: EucreTypes.Game;
  isLoading: boolean;
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
        gameUpdated: (game: EucreTypes.Game) => {
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
      appState.services.eucre.getCurrentGame().then((data: EucreTypes.Game) => {
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
      appState.services.eucre.shuffleDeck().then((data: boolean) => {
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
      appState.services.eucre.playCard(card).then((data: boolean) => {
        console.log("played");
      });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: EucreState = {
  game: {
    board: {
      boardStatus: `GameStarting`,
      description: ``,
      deck: [],
      pile: [],
      playerHand: { cards: [] },
      partnerHand: { cards: [] },
      leftOpponentHand: { cards: [] },
      rightOpponentHand: { cards: [] },
    },
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
