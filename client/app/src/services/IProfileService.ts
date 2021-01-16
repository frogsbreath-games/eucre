import { Profile } from "app/types/Profile";

export interface IProfileService {
  getProfile(): Promise<Profile>;
  addProfile(): Promise<Profile>;
  updateProfile(profile: Profile): Promise<Profile>;
}
