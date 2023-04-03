import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'
import { User } from '../../model/User';
import { USER_DATA } from '../../model/mock-user-list';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  url = environment.urlService +'/user';

  userJosep: User;
  userMatias: User;

  constructor(private http: HttpClient) {
    this.getAllUsers().subscribe(
      users => { 
      }
    )
   }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  register(name: string, surname: string, password: string, email: string, degree: string, description: string): Observable<User> {    
    return this.http.post<User>(this.url + '/register', {email, password, name, surname, degree, description})
  }
  getUserByName(name: string): User {
    return USER_DATA.filter(user => user.name === name)[0];
  }
  setToken(Token: Token) {
    // Create a JSON Web Token (JWT)
    // Return the token string
  }
  getJosepExample() : any {
    return this.userJosep
  
  }
  
  getMatiasExample() : any {
    return this.userMatias
  }
}


