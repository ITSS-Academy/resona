import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {ProfileModel} from '../../models/profile.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProfileById(userId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${environment.apiUrl}/profile/${userId}`);
  }

  followProfile(followerId: string, followingId: string) {
    return this.http.post(`${environment.apiUrl}/profile/follow/${followerId}/${followingId}`,{});
  }

  getFollowers(profileId: string) {
    return this.http.get<ProfileModel[]>(`${environment.apiUrl}/profile/followers/${profileId}`);
  }

  getProfileByTrackId(trackId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${environment.apiUrl}/profile/by-track/${trackId}`);
  }

}
