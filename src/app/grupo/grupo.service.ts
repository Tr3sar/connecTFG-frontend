import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Group } from './model/Group';
import { HttpClient } from '@angular/common/http';
import { Message } from './model/Message';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private url: string = environment.urlService + '/group'

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllGroups() : Observable<Group[]>{
    return this.http.get<Group[]>(this.url);
  }

  saveGroup(group: Group) : Observable<Group> {
    let url = this.url;
    if (group.id != null) {
      url += '/' + group.id
    }
    
    return this.http.put<Group>(url, {group});
  }

  createMessage(group_id: number, emitter: number, message: string, file?: File) {
    const formData = new FormData();

    formData.append('group_id', group_id.toString())
    formData.append('emitter', emitter.toString())
    formData.append('message', message)

    if (file) {
      formData.append('file', file, file.name)
    }

    return this.http.post<Group>(this.url + '/messages', formData)
  }

  getMessagesFromGroup(id: number){
    return this.http.get<Message[]>(this.url + '/messages/' + id);
  }

  getGroupsFromUser() : Observable<Group[]>{
    return this.http.get<Group[]>(this.url + '/groups/' + this.loginService.getUserId());
  }

  deleteGroupById(id: number) : Observable<Group> {
    return this.http.delete<Group>(this.url + `/${id}`)
  }

  getGroupWithUser(id: number) {
    return this.http.get<Group>(this.url + `/two-users/${id}/${this.loginService.getUserId()}`)
  }
}
