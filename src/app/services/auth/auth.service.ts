import {Injectable} from '@angular/core';
import {Auth, signInWithPopup, GoogleAuthProvider} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {Observable} from "rxjs";
import {ProfileModel} from "../../models/profile.model";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private httpClient: HttpClient, private router: Router) {
  }

  async login() {
    const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());

    const idToken = await credential.user.getIdToken();

    console.log('Firebase user:', credential.user);
    console.log('Firebase ID Token:', idToken);

    return this.httpClient.get(`${environment.apiUrl}/auth`, {
      headers: {Authorization: idToken}
    }).toPromise();
  }

  async logout() {
    await this.auth.signOut();
    window.location.href = '/home';
  }

  getProfile(id: string): Observable<ProfileModel> {
    return this.httpClient.get<ProfileModel>(`${environment.apiUrl}/auth/${id}`);
  }
}
