import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackModel } from '../../models/track.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NewReleaseSongsService {
  constructor(private http: HttpClient) {}

  getNewReleasedTracks(): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${environment.apiUrl}/track/new-released`);
  }
}
