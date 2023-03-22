import { Injectable } from '@angular/core';
import { GROUP_DATA } from './model/mock-group-list';
import { of, Observable } from 'rxjs'
import { Group } from './model/Group';
import { HttpClient } from '@angular/common/http';

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
    return this.http.put<Group[]>(this.url, {name: group.name, members: group.member_id, description: group.description});
  }
}
