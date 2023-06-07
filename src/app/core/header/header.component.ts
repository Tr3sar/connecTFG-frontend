import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { Notification } from 'src/app/notifications/model/Notification';
import { NotificationService } from 'src/app/notifications/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AboutUsComponent } from 'src/app/about-us/about-us.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notifications: Notification[] = [];

  inInicio = false;
  inChat = false;
  inConections = false;
  inNotifications = false;

  constructor(public loginService: LoginService, private notificationService: NotificationService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.loginService.isAuthenticated()) {
      this.notificationService.getNotifications().subscribe(
        notifications => {
          this.notifications = notifications;
        }
      )
    }

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        if (event.url.includes('/feed')) {
          this.inInicio = true;


          this.inChat = false;
          this.inConections = false;
          this.inNotifications = false;
        } else if (event.url.includes('/grupo')) {
          this.inChat = true;


          this.inInicio = false;
          this.inConections = false;
          this.inNotifications = false;
        } else if (event.url.includes('/conexiones')) {
          this.inConections = true;

          this.inInicio = false;
          this.inChat = false;
          this.inNotifications = false;
        } else if (event.url.includes('/notifications')) {
          this.inNotifications = true;

          this.inInicio = false;
          this.inChat = false;
          this.inConections = false;
        }
      }
    });
  }

  showAboutUs() {
    const dialogRef = this.dialog.open(AboutUsComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
