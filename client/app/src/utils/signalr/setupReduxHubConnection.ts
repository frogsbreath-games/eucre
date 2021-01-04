import { buildHubConnection } from "./buildHubConnection";
import { configureHubEventHandlers } from "./configureHubEventHandlers";
import { startHubConnection } from "./startHubConnection";

// Set up a SignalR connection to the specified hub URL, and actionEventMap.
// actionEventMap should be an object mapping event names, to eventHandlers that will
// be dispatched with the message body.
export const setupReduxHubConnection = <TAction>(
  connectionHub: string,
  actionEventMap: { [Key: string]: (...args: any[]) => TAction },
  getAccessToken?: () => string | Promise<string>
) => (dispatch: (action: TAction) => void) => {
  const connection = buildHubConnection(connectionHub, getAccessToken);

  startHubConnection(connection);

  const array = Object.entries(actionEventMap).map(
    ([key, handler]) =>
      [key, (...args: any[]) => dispatch(handler(args))] as [
        string,
        (...args: any[]) => void
      ]
  );

  configureHubEventHandlers(connection, array);

  return connection;
};
