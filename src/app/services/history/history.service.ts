import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoryModel } from '../../models/history.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private apiUrl = 'http://localhost:3000/history';

  constructor(private http: HttpClient) {}

  getHistory(userId: string, limit: number = 50): Observable<HistoryModel[]> {
    return this.http.get<HistoryModel[]>(
      `${this.apiUrl}/${userId}?limit=${limit}`
    );
  }

  // === PHƯƠNG THỨC MỚI ===
  addToHistory(userId: string, trackId: string): Observable<any> {
    return this.http.post(this.apiUrl, { userId, trackId });
    }
}
