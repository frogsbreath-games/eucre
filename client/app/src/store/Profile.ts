import { Action, Reducer } from "redux";
import { AppThunkAction } from "./";
import { Profile } from "app/types/Profile";

export interface ProfileState {
  profile: Profile;
  isLoading: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestProfileAction {
  type: "REQUEST_PROFILE";
}

interface ReceiveProfileAction {
  type: "RECEIVE_PROFILE";
  profile: Profile;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestProfileAction | ReceiveProfileAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  requestProfile: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState();
    if (appState && appState.lobby) {
      appState.services.profile.getProfile().then((data: Profile) => {
        let prof = data;
        if (prof.id === null) {
          appState.services.profile.addProfile().then((data: Profile) => {
            prof = data;
          });
        }
        dispatch({
          type: "RECEIVE_PROFILE",
          profile: prof,
        });
      });
      dispatch({
        type: "REQUEST_PROFILE",
      });
    }
  },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ProfileState = {
  profile: {},
  isLoading: false,
};

export const reducer: Reducer<ProfileState> = (
  state: ProfileState | undefined,
  incomingAction: Action
): ProfileState => {
  if (state === undefined) {
    return unloadedState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_PROFILE":
      return {
        profile: state.profile,
        isLoading: true,
      };
    case "RECEIVE_PROFILE":
      return {
        profile: action.profile,
        isLoading: false,
      };
    default:
      return state;
  }
};
