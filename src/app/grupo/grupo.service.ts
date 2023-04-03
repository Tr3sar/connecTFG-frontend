import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'
import { Group } from './model/Group';
import { HttpClient } from '@angular/common/http';
import { Message } from './model/Message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private url: string = environment.urlService + '/group'

  constructor(private http: HttpClient) { }

  getAllGroups() : Observable<Group[]>{
    return this.http.get<Group[]>(this.url);
  }

  saveGroup(group: Group) : Observable<Group[]> {
    let url = this.url;
    if (group.id != null) {
      url += '/' + group.id
    }
    console.log('grupo a enviar')
    return this.http.put<Group[]>(url, {group});
  }

  createMessage(group_id: number, emitter: number, message: string) {
    return this.http.post<Group>(this.url + '/messages', {group_id, emitter, message})
  }

  getMessagesFromGroup(id: number){
    return this.http.get<Message[]>(this.url + '/messages/' + id);
  }

  getGroupsFromUser(userId: number) : Observable<Group[]>{
    return this.http.get<Group[]>(this.url + '/groups/' + userId);
  }
}
