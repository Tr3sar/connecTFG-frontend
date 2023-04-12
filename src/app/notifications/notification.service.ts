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

  createNotification(message: string, destintationUserId: number) : Observable<Notification>{
    return this.http.put<Notification>(this.url, { message, user_id: destintationUserId });
  }

  deleteNotification(id: number) {
    return this.http.delete<Notification>(this.url + `/${id}`);
  }

}
