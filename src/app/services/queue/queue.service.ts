import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {QueueModel} from '../../models/queue.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(
    private http: HttpClient,
  ) {
  }


  addTrackToQueue(userId: string, trackId: string, position?: number) {
    return this.http.post<QueueModel>(`${environment.apiUrl}/queue`, {userId, trackId, position});
  }

  getTrackByUser(userId: string) {
    return this.http.get<QueueModel[]>(`${environment.apiUrl}/queue/${userId}`);
  }

  removeTrackFromQueue(userId: string, trackId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiUrl}/queue?userId=${userId}&trackId=${trackId}`);
  }

  addPlaylistToQueue(userId: string, playlistId: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/queue/add-playlist/${userId}`, {playlistId});
  }

  addCategoryToQueue(userId: string, categoryId: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/queue/add-category/${userId}`, {categoryId});
  }

  playSongNow(userId: string, trackId: string) {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/queue/play-now/${userId}`, {trackId});
  }

  refillQueue(userId: string, limit: number = 10): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${userId}/refill?limit=${limit}`, {});
  }
}
