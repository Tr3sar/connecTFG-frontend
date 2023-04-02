import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'
import { User } from '../../model/User';
import { USER_DATA } from '../../model/mock-user-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080/user';

  userJosep: User;
  userMatias: User;

  constructor(private http: HttpClient) {
    this.getAllUsers().subscribe(
      users => { 
        this.userJosep = users[0]
        this.userMatias = users[1]
      }
    )
   }

  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }
  
  getUserByName(name: string) : User{
    return USER_DATA.filter(user => user.name === name)[0];
  }

  getJosepExample() : any {
    return this.userJosep
    
  }

  getMatiasExample() : any {
    return this.userMatias
  }
}
