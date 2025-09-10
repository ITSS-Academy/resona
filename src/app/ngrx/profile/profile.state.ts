import {ProfileModel} from '../../models/profile.model';

export interface ProfileState{
  profileList: ProfileModel[];
  isLoading: boolean;
  error: any;
}
