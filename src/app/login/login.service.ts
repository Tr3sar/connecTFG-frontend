import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { JwtHelperServiceWrapper } from './JwtHelperServiceWrapper';
import { environment } from 'src/environments/environment';
import { User } from '../core/model/User';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = environment.urlService;
  activeUser: User;

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperServiceWrapper) { }

  SignUp(email: string, password: string, name: string, surname: string, degree: string, description: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/register`, { email, password, name, surname, degree, description })
  }

  SignIn(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('Setting user tokens')
          this.setActiveUserWithId(response.id);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id)
        })
      );
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    const userId = this.getUserId();
    return token != null && !this.jwtHelper.isTokenExpired(token) && userId != null;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('activeUser')
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getUserId() {
    return localStorage.getItem('userId')
  }

  setActiveUserWithId(id: string) {
    console.log('id de la response', id);
    this.httpClient.get<User>(this.url + '/user/' + id).subscribe(res => {
      res.password = '';
      const userString = JSON.stringify(res);
      localStorage.setItem('activeUser', userString);
    })
  }

  getActiveUser() : User {
    const userString = localStorage.getItem('activeUser')!;
    return JSON.parse(userString);
  } 
}
