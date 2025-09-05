import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentModel} from '../../models/comment.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
  ) { }

  getComments(id:string){
    return this.http.get<CommentModel[]>(`http://localhost:3000/comment/${id}`);
  }

  createComment(trackId: string, userId: string, content: string) {
    return this.http.post<CommentModel>(`http://localhost:3000/comment/${trackId}/${userId}`, {trackId, userId, content});
  }

  getTotalCommentBasedOnTrackId(id: string): Observable<number> {
    return this.http.get<number>(`http://localhost:3000/comment/count/${id}`);
  }


}
