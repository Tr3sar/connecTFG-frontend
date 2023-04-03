import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { JwtHelperServiceWrapper } from './JwtHelperServiceWrapper';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = environment.urlService;
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperServiceWrapper) { }

  SignUp(email:string, password:string, name:string, surname:string, degree:string, description:string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/register`,{email, password, name, surname, degree, description})
  }

  SignIn(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/login`,{email,password})
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  }

