import { Profile } from "app/types/Profile";
import { IProfileService } from "./IProfileService";
import ApiClient from "app/tools/ApiClient";

export class ProfileService implements IProfileService {
  private readonly _apiClient: ApiClient;

  constructor(baseUrl: string | undefined, tokenAudience: string | undefined) {
    this._apiClient = new ApiClient([baseUrl, `api/profile/`], tokenAudience);
  }

  public getProfile(): Promise<Profile> {
    return this._apiClient.get<Profile>(``);
  }

  public addProfile(profile: Profile): Promise<Profile> {
    return this._apiClient.post<Profile>(``, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
  }
}
