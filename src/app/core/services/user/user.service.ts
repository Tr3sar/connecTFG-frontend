import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { User } from '../../model/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  url = environment.urlService +'/user';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  register(name: string, surname: string, password: string, email: string, degree: string, description: string): Observable<User> {    
    return this.http.post<User>(this.url + '/register', {email, password, name, surname, degree, description})
  }
  getUserByName(name: string): User {
    //return USER_DATA.filter(user => user.name === name)[0];
    return new User();
  }

  acceptUserConection(conectionUserId: number) : Observable<User> {
    return this.http.put<User>(this.url + '/conections/' + this.loginService.getUserId(), {conectionUserId});
  }

  getUserConections() : Observable<number[]> {
    return this.http.get<number[]>(this.url + '/conections/' + this.loginService.getUserId())
  }
 }


