import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { Notification } from 'src/app/notifications/model/Notification';
import { NotificationService } from 'src/app/notifications/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notifications: Notification[] = []

  constructor(public loginService: LoginService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.loginService.isAuthenticated()) {
      this.notificationService.getNotifications().subscribe(
        notifications => {
          this.notifications = notifications;
        }
      )
    }
  }

}
