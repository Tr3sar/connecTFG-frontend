import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { Post } from '../feed/model/post.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url: string = environment.urlService + '/'

  constructor(private http: HttpClient, private loginService: LoginService) { }
  
  cerrarPost(post: Post): Observable<Post> {
    let url = `${this.url}/close/${post.id}`;
    return this.http.put<Post>(url, post);
    }
}
