import { ProfileModel } from '../../models/profile.model';

export interface ProfileState {
  profile: ProfileModel | null;
  loading: boolean;
  error: string | null;
}

export const initialProfileState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};
