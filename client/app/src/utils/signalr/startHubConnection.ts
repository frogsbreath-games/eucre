import { HubConnectionState, HubConnection } from "@microsoft/signalr";

export const startHubConnection = async (connection: HubConnection) => {
  try {
    await connection.start();
    console.assert(connection.state === HubConnectionState.Connected);
    console.log("SignalR connection established");
  } catch (err) {
    console.assert(connection.state === HubConnectionState.Disconnected);
    console.error("SignalR Connection Error: ", err);
    setTimeout(() => startHubConnection(connection), 5000);
  }
};
