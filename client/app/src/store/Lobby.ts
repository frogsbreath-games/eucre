import { Action, Reducer } from "redux";
import { AppThunkAction } from "./";
import { Lobby } from "app/types/Lobby";
import { ChatMessage } from "app/types/ChatMessage";

export interface LobbyState {
  room: Lobby;
  chatMessage: ChatMessage;
  isLoading: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestLobbyAction {
  type: "REQUEST_LOBBY";
}

interface ChatSentAction {
  type: "CHAT_SENT";
  message: ChatMessage;
}

interface ReceiveLobbyAction {
  type: "RECIEVE_LOBBY";
  lobby: Lobby;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestLobbyAction | ReceiveLobbyAction | ChatSentAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  enterLobby: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const appState = getState();
    if (appState && appState.lobby) {
      appState.services.lobby.connectToLobbyHub({
        chatSent: (chat: ChatMessage) => {
          dispatch({
            type: "CHAT_SENT",
            message: chat,
          });
        },
      });
    }
  },
  requestLobby: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.lobby) {
      appState.services.lobby.getLobby().then((data: Lobby) => {
        console.log("Lobby Requested");
        dispatch({
          type: "RECIEVE_LOBBY",
          lobby: data,
        });
      });
      dispatch({
        type: "REQUEST_LOBBY",
      });
    }
  },

  chat: (message: string): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const appState = getState();
    if (appState && appState.lobby) {
      appState.services.lobby.sendChat(message).then((data: boolean) => {
        console.log("chatted");
        console.log(data);
      });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: LobbyState = {
  room: {},
  chatMessage: {},
  isLoading: false,
};

export const reducer: Reducer<LobbyState> = (
  state: LobbyState | undefined,
  incomingAction: Action
): LobbyState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_LOBBY":
      return {
        room: state.room,
        chatMessage: state.chatMessage,
        isLoading: true,
      };
    case "RECIEVE_LOBBY":
      return {
        room: action.lobby,
        chatMessage: state.chatMessage,
        isLoading: false,
      };
    case "CHAT_SENT":
      return {
        room: state.room,
        chatMessage: action.message,
        isLoading: false,
      };
    default:
      return state;
  }
};
