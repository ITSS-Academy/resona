import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PlaylistModel} from '../../models/playlist.model';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  createPlaylist(title: string, description: string, thumbnail: File, userId: string): Observable<PlaylistModel> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);

    for (const [key, value] of formData.entries()) {
      console.log(key, value); // 👈 debug
    }

    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}/playlist/create/${userId}`,
      formData
    );
  }

  getPlaylists(userId: string): Observable<PlaylistModel[]> {
    return this.http.get<PlaylistModel[]>(`${environment.apiUrl}/playlist/all-playlists/${userId}`);
  }

  getPlaylistById(id: string): Observable<PlaylistModel> {
    return this.http.get<PlaylistModel>(`${environment.apiUrl}/playlist/all-tracks/${id}`);
  }

}
