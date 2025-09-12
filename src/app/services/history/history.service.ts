import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HistoryModel} from '../../models/history.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class HistoryService {
  private apiUrl = 'http://localhost:3000/history';

  constructor(private http: HttpClient) {
  }

  getHistory(userId: string, limit: number = 50): Observable<HistoryModel[]> {
    return this.http.get<HistoryModel[]>(
      `${environment.apiUrl}/${userId}?limit=${limit}`
    );
  }

  // === PHƯƠNG THỨC MỚI ===
  addToHistory(userId: string, trackId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}`, {userId, trackId});
  }
}
