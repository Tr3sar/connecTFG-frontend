import { Injectable } from '@angular/core';
import { Post } from './model/post.model';
import { of, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private url: string = 'http://localhost:8080/feed'
  constructor( private http: HttpClient) {}

  getAllPosts() : Observable<Post[]>{
    return this.http.get<Post[]>(this.url);
  }
}
