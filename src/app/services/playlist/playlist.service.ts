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

  createPlaylist(title: string, userId: string, thumbnailPath: string, description: string): Observable<PlaylistModel> {
    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}/playlist/create/${userId}`,
      {title, thumbnailPath, description}
    );
  }

  getPlaylists(): Observable<PlaylistModel[]> {
    return this.http.get<PlaylistModel[]>(`${environment.apiUrl}/playlist/all-playlists/e8d29e92-000d-4478-b8c4-41dafc556323`);
  }

  getPlaylistById(id: string): Observable<PlaylistModel> {
    return this.http.get<PlaylistModel>(`${environment.apiUrl}/playlist/all-tracks/${id}`);
  }
}
