export default class ApiClient {

  private readonly _baseUrl : string;

  constructor(...baseUrlSegments: (string | undefined)[]) {
    let baseUrl = "";

    baseUrlSegments.forEach(segment => {
      if (segment)
        baseUrl += segment;
    });

    this._baseUrl = baseUrl;
  }

  public fetch(relativePath: string, init?: RequestInit | undefined) : Promise<Response> {
    return fetch(this._baseUrl + relativePath, init);
  }

  public fetchJson<TResponseJson>(relativePath: string, init?: RequestInit | undefined, onrejected?: (response: any) => never) : Promise<TResponseJson> {
    return this.fetch(relativePath, init)
      .then(
        (response) => response.json() as Promise<TResponseJson>,
        onrejected);
  }
}