import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  followProfile(followerId: string, followingId: string) {
    return this.http.post(`${environment.apiUrl}/profile/follow/${followerId}/${followingId}`, {
      followerId,
      followingId
    });
  }

  getFollowers(profileId: string) {
    return this.http.get<string[]>(`${environment.apiUrl}/profile/followers/${profileId}`);
  }
  
}
