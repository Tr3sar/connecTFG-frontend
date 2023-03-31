import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'
import { Group } from './model/Group';
import { HttpClient } from '@angular/common/http';
import { Message } from './model/Message';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private url: string = 'http://localhost:8080/group'

  constructor(private http: HttpClient) { }

  getAllGroups() : Observable<Group[]>{
    return this.http.get<Group[]>(this.url);
  }

  saveGroup(group: Group) : Observable<Group[]> {
    return this.http.put<Group[]>(this.url, {name: group.name, members: group.members, description: group.description});
  }

  createMessage(group_id: number, emitter: number, message: string) {
    return this.http.post<Group>(this.url + '/messages', {group_id, emitter, message})
  }

  getMessagesFromGroup(id: number){
    return this.http.get<Message[]>(this.url + '/messages/' + id);
  }
}
