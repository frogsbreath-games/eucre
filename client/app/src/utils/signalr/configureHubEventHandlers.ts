import { HubConnection } from "@microsoft/signalr";

export const configureHubEventHandlers = (
  connection: HubConnection,
  eventHandlers: Array<[string, (...args: any[]) => void]>
) => {
  eventHandlers.forEach(([key, handler]) => {
    connection.on(key, (res) => {
      handler && handler(res);
    });
  });
};
