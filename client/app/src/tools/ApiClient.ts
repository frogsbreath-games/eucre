import { getApiToken } from "app/utils/getAuthToken";

type HttpMethod = `get` | `post` | `put` | `patch` | `delete`;

interface BaseRequestInit {
  headers?: Headers | string[][] | Record<string, string>;
}

interface GetRequestInit extends BaseRequestInit {}

interface DeleteRequestInit extends BaseRequestInit {}

interface PostRequestInit extends BaseRequestInit {
  body?: BodyInit | null;
}

interface PutRequestInit extends BaseRequestInit {
  body?: BodyInit | null;
}

interface PatchRequestInit extends BaseRequestInit {
  body?: BodyInit | null;
}

interface FetchRequestInit extends BaseRequestInit {
  method: HttpMethod;
  body?: BodyInit | null;
}

export default class ApiClient {
  private readonly _baseUrl: string;
  private readonly _getToken: (() => Promise<string>) | undefined;

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
  }

  public async fetchRaw(
    relativePath: string,
    init: FetchRequestInit
  ): Promise<Response> {
    const getToken = this._getToken;
    if (getToken) {
      const token = await getToken();
      const headers = new Headers(init.headers);
      headers.append(`Authorization`, `Bearer ${token}`);
      init.headers = headers;
    }

    return await fetch(this._baseUrl + relativePath, init);
  }

  public fetch<TResponseJson>(
    relativePath: string,
    init: FetchRequestInit,
    onrejected?: (response: any) => never
  ): Promise<TResponseJson> {
    return this.fetchRaw(relativePath, init).then(
      (response) => response.json() as Promise<TResponseJson>,
      onrejected
    );
  }

  public get<TResponseJson>(
    relativePath: string,
    init?: GetRequestInit,
    onrejected?: (response: any) => never
  ): Promise<TResponseJson> {
    return this.fetch<TResponseJson>(
      relativePath,
      { ...init, method: `get` },
      onrejected
    );
  }

  public delete<TResponseJson>(
    relativePath: string,
    init?: DeleteRequestInit,
    onrejected?: (response: any) => never
  ): Promise<TResponseJson> {
    return this.fetch<TResponseJson>(
      relativePath,
      { ...init, method: `delete` },
      onrejected
    );
  }

  public post<TResponseJson>(
    relativePath: string,
    init?: PostRequestInit,
    onrejected?: (response: any) => never
  ): Promise<TResponseJson> {
    return this.fetch<TResponseJson>(
      relativePath,
      { ...init, method: `post` },
      onrejected
    );
  }

  public patch<TResponseJson>(
    relativePath: string,
    init?: PatchRequestInit,
    onrejected?: (response: any) => never
  ): Promise<TResponseJson> {
    return this.fetch<TResponseJson>(
      relativePath,
      { ...init, method: `patch` },
      onrejected
    );
  }

  public put<TResponseJson>(
    relativePath: string,
    init?: PutRequestInit,
    onrejected?: (response: any) => never
  ): Promise<TResponseJson> {
    return this.fetch<TResponseJson>(
      relativePath,
      { ...init, method: `put` },
      onrejected
    );
  }
}
