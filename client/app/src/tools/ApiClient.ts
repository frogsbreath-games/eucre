export default class ApiClient {

  private readonly _baseUrl : string | undefined;

  constructor(baseUrl?: string | undefined) {
    this._baseUrl = baseUrl;
  }

  public fetch(relativePath: string, init?: RequestInit | undefined) : Promise<Response> {
    return fetch(this._baseUrl ? this._baseUrl + relativePath : relativePath, init);
  }

  public fetchJson<TResponseJson>(relativePath: string, init?: RequestInit | undefined, onrejected?: (response: any) => never) : Promise<TResponseJson> {
    return this.fetch(relativePath, init)
      .then(
        (response) => response.json() as Promise<TResponseJson>,
        onrejected);
  }
}