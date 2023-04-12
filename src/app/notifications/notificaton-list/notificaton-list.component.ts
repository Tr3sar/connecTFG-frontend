import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification } from '../model/Notification';

@Component({
  selector: 'app-notificaton-list',
  templateUrl: './notificaton-list.component.html',
  styleUrls: ['./notificaton-list.component.scss']
})
export class NotificatonListComponent implements OnInit {

  notifications: Notification[] = []

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(
      notifications => {
        this.notifications = notifications;
      }
    )
  }

  deleteNotification(id: number) {
    this.notificationService.deleteNotification(id).subscribe(
      res => {
        this.ngOnInit();
        window.location.reload();
      }
    )
  }

}
