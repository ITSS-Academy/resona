import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TrackModel} from '../../models/track.model';
import {environment} from '../../../environments/environment.development';
import {CategoryModel} from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchCategories(query: string): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(
      `${environment.apiUrl}/category/search`,
      {params: {search: query}}
    );
  }
}
