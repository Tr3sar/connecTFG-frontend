import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { Observable, Subject } from 'rxjs';
import { Notification } from './model/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = environment.urlService + '/notification'

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getNotifications() : Observable<Notification[]>{
    return this.http.get<Notification[]>(this.url + `/${this.loginService.getUserId()}`);
  }

  createNotification(type: string, emitter_id: number, receiver_id: number) : Observable<Notification>{
    return this.http.put<Notification>(this.url, { type, emitter: emitter_id, receiver: receiver_id });
  }

  deleteNotification(id: number) {
    return this.http.delete<Notification>(this.url + `/${id}`);
  }

}
