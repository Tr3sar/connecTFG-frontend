import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'
import { User } from '../model/User';
import { USER_DATA } from '../model/mock-user-list';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers() : Observable<User[]>{
    return of(USER_DATA)
  }
  
  getUserByName(name: string) : User{
    return USER_DATA.filter(user => user.name === name)[0];
  }
}
