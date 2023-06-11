import { Injectable } from '@angular/core';
import { Post } from './model/post.model';
import { Observable } from 'rxjs'
import { PostPage } from './model/page/postPage';
import { HttpClient } from '@angular/common/http';
import { Pageable } from './model/page/pageable';
import { environment } from 'src/environments/environment';
import { User } from '../core/model/User';
import { LoginService } from '../login/login.service';
import { Comment } from './model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  getPost(id: number) {
    throw new Error('Method not implemented.');
  }

  private url: string = environment.urlService + '/feed'
  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllPosts(pageable: Pageable, filterValue: string): Observable<PostPage> {
    return this.http.post<PostPage>(this.url, { pageable: pageable, filterValue: filterValue });
  }

  getPostsFromUser(id: number) : Observable<Post[]>{
    return this.http.get<Post[]>(this.url +"/"+id);
  }

  savePost(post: Post): Observable<Post> {
    let url = this.url;

    let title = post.title;
    let content = post.content;
    let author = this.loginService.getUserId()
    if (post.id != null) {
      url += '/' + post.id
    }

    return this.http.post<Post>(url + '/create', { title, content, author });
  }
  createComment(postId: number, message: string) {
    const authorId = this.loginService.getUserId()
    
    return this.http.post<Comment>("http://localhost:8080" + '/comment/' + postId, { authorId, message })
  }
  
  cerrarPost(post: Post): Observable<Post> {
    let url = `${this.url}/${post.id}`;

    let title = post.title;
    let content = post.content;
    let author = this.loginService.getUserId();
    let closed = post.closed
    if (post.id != null) {
      url += '/' 
    }
    return this.http.put<Post>(url + '/close/' + post.id,  { title, content, author, closed });
  }

  addApplicant(postId: number): Observable<User> {
    const applicantId = this.loginService.getUserId()
    
    return this.http.put<User>(this.url + '/apply/' + postId, { applicantId });
  }

  getApplicantsToUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/applicants/' + this.loginService.getUserId());
  }

  rejectApplicant(applicantId: number): Observable<Post[]> {
    return this.http.put<Post[]>(this.url + '/applicants/' + this.loginService.getUserId(), { applicantId })
  }
}
