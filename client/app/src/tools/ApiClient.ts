import { getApiToken } from "app/utils/getAuthToken";
export default class ApiClient {
  private readonly _baseUrl: string;

  constructor(...baseUrlSegments: (string | undefined)[]) {
    let baseUrl = "";

    baseUrlSegments.forEach((segment) => {
      if (segment) baseUrl += segment;
    });

    this._baseUrl = baseUrl;
  }

  public async fetch(
    relativePath: string,
    init?: RequestInit | undefined
  ): Promise<Response> {
    const token = await getApiToken();
    if (!init) {
      init = {};
    }
    init.headers = {
      Authorization: `Bearer ${token}`,
    };

    return await fetch(this._baseUrl + relativePath, init);
  }

  public fetchJson<TResponseJson>(
    relativePath: string,
    init?: RequestInit | undefined,
    onrejected?: (response: any) => never
  ): Promise<TResponseJson> {
    return this.fetch(relativePath, init).then(
      (response) => response.json() as Promise<TResponseJson>,
      onrejected
    );
  }
}
