import { Profile } from "app/types/Profile";

export interface IProfileService {
  getProfile(): Promise<Profile>;
  addProfile(): Promise<boolean>;
}
