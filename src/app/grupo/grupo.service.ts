import { Injectable } from '@angular/core';
import { GROUP_DATA } from './model/mock-group-list';
import { of, Observable } from 'rxjs'
import { Group } from './model/Group';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor() { }

  getAllGroups() : Observable<Group[]>{
    return of(GROUP_DATA);
  }

  saveGroup(group: Group) : Observable<Group[]> {
    GROUP_DATA.push(group)
    return of(GROUP_DATA);
  }
}
