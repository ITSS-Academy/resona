import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentModel} from '../../models/comment.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
  ) { }

  getComments(trackId:string){
    return this.http.get<CommentModel[]>(`${environment.apiUrl}/comment/${trackId}`);
  }

  createComment(trackId: string, userId: string, content: string) {
    return this.http.post<CommentModel>(`${environment.apiUrl}/comment/${trackId}/${userId}`, {trackId, userId, content});
  }

  deleteComment(id:string, userId: string){
    return this.http.delete<string>(`${environment.apiUrl}/comment/${id}/${userId}`)
  }
}
