import {
  JsonHubProtocol,
  HubConnectionState,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

const isDev = process.env.NODE_ENV === "development";

export const buildHubConnection = (
  connectionHub: string,
  getAccessToken?: () => string | Promise<string>
) => {
  const options = {
    logMessageContent: isDev,
    logger: isDev ? LogLevel.Warning : LogLevel.Error,
    accessTokenFactory: getAccessToken ? () => getAccessToken() : undefined,
  };
  // create the connection instance
  // withAutomaticReconnect will automatically try to reconnect
  // and generate a new socket connection if needed
  const connection = new HubConnectionBuilder()
    .withUrl(connectionHub, options)
    .withAutomaticReconnect()
    .withHubProtocol(new JsonHubProtocol())
    .configureLogging(LogLevel.Information)
    .build();

  // Note: to keep the connection open the serverTimeout should be
  // larger than the KeepAlive value that is set on the server
  // keepAliveIntervalInMilliseconds default is 15000 and we are using default
  // serverTimeoutInMilliseconds default is 30000 and we are using 60000 set below
  connection.serverTimeoutInMilliseconds = 60000;

  // re-establish the connection if connection dropped
  connection.onclose((error) => {
    console.assert(connection.state === HubConnectionState.Disconnected);
    console.log(
      "Connection closed due to error. Try refreshing this page to restart the connection",
      error
    );
  });

  connection.onreconnecting((error) => {
    console.assert(connection.state === HubConnectionState.Reconnecting);
    console.log("Connection lost due to error. Reconnecting.", error);
  });

  connection.onreconnected((connectionId) => {
    console.assert(connection.state === HubConnectionState.Connected);
    console.log(
      "Connection reestablished. Connected with connectionId",
      connectionId
    );
  });

  return connection;
};
