import {ProfileModel} from '../../models/profile.model';

export interface ProfileState{
  profile: ProfileModel
  profileList: ProfileModel[];
  isLoading: boolean;
  error: any;
}
