import {ProfileModel} from './profile.model';

export interface CommentModel{
  id:string;
  content:string;
  profile: ProfileModel;
  createdAt: string;
}
