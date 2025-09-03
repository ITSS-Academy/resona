import {Injectable} from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TrackModel} from '../../models/track.model';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${environment.apiUrl}/category`);
  }

  getCategoryDetails(categoryId: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${environment.apiUrl}/category/all-tracks/${categoryId}`);
  }
}
