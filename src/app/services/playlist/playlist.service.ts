import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PlaylistModel} from '../../models/playlist.model';
import {environment} from '../../../environments/environment.development';
import {TrackModel} from '../../models/track.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {
  }

  createPlaylist(title: string, description: string, thumbnail: File, userId: string, isPublic: boolean): Observable<PlaylistModel> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('isPublic', String(isPublic));

    for (const [key, value] of formData.entries()) {
      console.log(key, value); // 👈 debug
    }

    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}/playlist/create/${userId}`,
      formData
    );
  }

  getPlaylists(userId: string): Observable<PlaylistModel[]> {
    return this.http.get<PlaylistModel[]>(
      `${environment.apiUrl}/playlist/all-playlists/${userId}`
    );
  }

  getPlaylistById(id: string): Observable<PlaylistModel> {
    return this.http.get<PlaylistModel>(
      `${environment.apiUrl}/playlist/all-tracks/${id}`
    );
  }

  addToFavorite(userId: string, songId: string) {
    return this.http.post(
      `${environment.apiUrl}/playlist/favorite/${userId}/${songId}`,
      {}
    );
  }

  addTrackToPlaylist(playlistId: string, trackId: string): Observable<any> {
    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}/playlist/add-track`,
      {playlistId, trackId}
    );
  }

  deletePlaylist(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/playlist/delete`, {
      params: {id},
    });
  }

  removeTrackFromPlaylist(playlistId: string, trackId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/playlist/remove-track`, {body: {playlistId, trackId}});
  }

  getFavoritePlaylistByUserId(userId: string): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${environment.apiUrl}/playlist/favorite/${userId}`);
  }


}
