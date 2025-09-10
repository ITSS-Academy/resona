import {Injectable} from '@angular/core';
import {concatMap, from, map, mergeMap, Observable, of, switchMap, take, toArray} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {v4 as uuidv4} from 'uuid';
import {TrackModel} from '../../models/track.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {environment} from '../../../environments/environment.development';

export interface UploadProgressEvent {
  type: 'progress' | 'done';
  progress?: number; // 0..100
}

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(
    private http: HttpClient,
    private store: Store<{
      auth: AuthState
    }>
  ) {
  }

  uploadInChunks(params: {
    file: File;
    originalFileName: string; // ví dụ "my-song.mp4"
    categoryId?: string;
  }) {
    const {file, originalFileName} = params;

    // chunkSize cố định, không cho người dùng truyền vào nữa
    const chunkSize = 2 * 1024 * 1024; // 2MB (hoặc 5MB tuỳ bạn)
    const totalChunks = Math.ceil(file.size / chunkSize);

    const chunks: Blob[] = [];
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      chunks.push(file.slice(start, end));
    }

    const trackId = uuidv4();

    // Upload tuần tự từng chunk
    return from(chunks).pipe(
      mergeMap((blob, idx) => {
        const chunkFile = new File([blob], `${originalFileName}.part${idx + 1}`);

        const formData = new FormData();
        formData.append('files', chunkFile);
        formData.append('trackId', trackId);
        formData.append('trackName', `${originalFileName}.part${idx + 1}`);

        console.log(formData)

        return this.http.post(`${environment.apiUrl}/track/upload`, formData);
      }, totalChunks), // tuần tự
      toArray(),
      map(() => {
        return {
          trackId,
          trackName: originalFileName,
        };
      })
    );
  }


  /**
   * Gọi merge với thumbnail.
   */
  mergeTrack(input: {
    trackId: string;
    originalFileName: string;
    title: string;
    categoryId: string;
    thumbnail?: File | null;
    artists?: string | null;
    lyrics?: string;
  }): Observable<any> {
    const {trackId, originalFileName, title, categoryId, thumbnail, lyrics, artists} = input;

    const formData = new FormData();

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    if (lyrics) {
      const lyricsFile = new File([lyrics], 'lyrics.txt', {type: 'text/plain'});
      formData.append('lyrics', lyricsFile);
    }

    return this.store.select('auth', 'currentUser').pipe(
      take(1),
      switchMap(user => {
        if (!user) throw new Error('User not logged in');

        const params = new HttpParams()
          .set('trackId', trackId)
          .set('trackName', title)
          .set('categoryId', categoryId)
          .set('ownerId', user.uid)
          .set('artistName', artists || '');

        console.log('Merging track with params:', {
          trackId,
          originalFileName,
          title,
          categoryId,
          ownerId: user.uid,
          hasThumbnail: !!thumbnail,
          hasLyrics: !!lyrics,
          artists
        });

        return this.http.post(`${environment.apiUrl}/track/merge`, formData, {params});
      })
    );
  }

  getAllTracks(): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${environment.apiUrl}/track/track`);
  }

  getTrackById(id: string) {
    return this.http.get<TrackModel>(`http://localhost:3000/track/detail/${id}`);
  }

  getTracksByOwnerId(ownerId: string): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${environment.apiUrl}/track/uploaded/${ownerId}`);
  }


  getFavouriteTracks(userId: string): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${environment.apiUrl}/track/favorite/${userId}`);
  }


  getThumbnailBasedOnTrackId(id: string) {
    return this.http.get<{ url: string }>(`${environment.apiUrl}/track/thumbnail-url/${id}`);
  }

  getLyricsBasedOnTrackId(id: string) {
    return this.http.get<{ lyrics: string }>(`${environment.apiUrl}/track/lyrics/${id}`);
  }

  getTrackByCategoryId(categoryId: string): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${environment.apiUrl}/track/by-category/${categoryId}`);
  }

  incrementViewCount(trackId: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/track/increase-view/${trackId}`, {});
  }

  getNewReleasedTracks(): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${environment.apiUrl}/track/new-released`);
  }

  getPopularTracks(): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${environment.apiUrl}/track/popular`);
  }

  deleteTrack(trackId: string): Observable<TrackModel> {
    return this.http.delete<TrackModel>(`${environment.apiUrl}/track/${trackId}`);
  }

  getTracksBySameArtist(trackId:string): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${environment.apiUrl}/track/same-artist/${trackId}`);
  }

}
