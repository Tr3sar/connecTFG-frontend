import { Injectable } from '@angular/core';
import { Post } from './model/post.model';
import { of, Observable } from 'rxjs'
import { PostPage } from './model/page/postPage';
import { HttpClient } from '@angular/common/http';
import { Pageable } from './model/page/pageable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private url: string = environment.urlService +'/feed'
  constructor( private http: HttpClient) {}

  getAllPosts(pageable: Pageable) : Observable<PostPage>{
    return this.http.post<PostPage>(this.url, {pageable: pageable});
  }
}
