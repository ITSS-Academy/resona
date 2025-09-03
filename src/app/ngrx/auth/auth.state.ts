import {ProfileModel} from "../../models/profile.model";

export interface AuthState {
  currentUser: ProfileModel;
  idToken: string;
  isLogging: boolean;
  error: any;
}
