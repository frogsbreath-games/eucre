import { getApiToken } from "app/utils/getAuthToken";
import { setupSignalRConnection } from "app/utils/setupSignalRConnection";
import { HubConnection } from "@microsoft/signalr";

export default class HubClient {
  private readonly _baseUrl: string;
  private readonly _getToken: (() => Promise<string>) | undefined;
  private readonly _connections: Map<string, HubConnection>;

  constructor(
    baseUrlSegments: (string | undefined)[],
    tokenAudience?: string | undefined
  ) {
    let baseUrl = "";

    baseUrlSegments.forEach((segment) => {
      if (segment) baseUrl += segment;
    });

    this._baseUrl = baseUrl;

    this._getToken = tokenAudience
      ? () =>
          getApiToken({
            audience: tokenAudience,
          })
      : undefined;

    this._connections = new Map<string, HubConnection>();
  }

  public setupHub<TAction>(
    relativePath: string,
    actionEventMap: {
      [Key: string]: (...args: any[]) => TAction;
    },
    dispatch: (action: TAction) => void
  ): HubConnection {
    const setup = setupSignalRConnection<TAction>(
      this._baseUrl + relativePath,
      actionEventMap,
      this._getToken
    );

    const connection = setup(dispatch);

    this._connections.set(relativePath, connection);

    return connection;
  }

  public async send(
    relativePath: string,
    methodName: string,
    ...args: any[]
  ): Promise<any> {
    const connection = this._connections.get(relativePath);

    if (connection) {
      return await connection.send(methodName, args);
    } else {
      return undefined;
    }
  }
}
