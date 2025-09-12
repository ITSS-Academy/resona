import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {QueueModel} from '../../models/queue.model';

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

  removeTrackFromQueue(userId: string, trackId: string) {
    return this.http.delete<{ message: string }>(`${environment.apiUrl}/queue`, {params: {userId, trackId}});
  }

  playSongNow(userId: string, trackId: string) {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/queue/play-now/${userId}`, {userId, trackId});
  }
}
