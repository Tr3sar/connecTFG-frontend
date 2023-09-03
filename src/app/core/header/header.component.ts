import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { Notification } from 'src/app/notifications/model/Notification';
import { NotificationService } from 'src/app/notifications/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AboutUsComponent } from 'src/app/about-us/about-us.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notifications: Notification[] = [];

  languages = [
    { code: 'va', name: 'Valencià' },
    { code: 'es', name: 'Castellano' }
  ]

  selectedLanguage: string;


  inInicio = false;
  inChat = false;
  inConections = false;
  inNotifications = false;

  constructor(public loginService: LoginService, private notificationService: NotificationService,
    private router: Router, public dialog: MatDialog, private translate: TranslateService) {
  }

  ngOnInit(): void {

    this.setupLanguage();

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

  private setupLanguage() {
    this.translate.addLangs(this.languages.map(language => language.code))
    this.translate.setDefaultLang('es');

    var userLanguage = navigator.language

    if (userLanguage == 'ca') {
      this.translate.use('va')
      this.translate.setDefaultLang('va')
      this.selectedLanguage = 'Valencià'
    } else {
      this.translate.use('es');
      this.selectedLanguage = 'Castellano'
    }
  }

  showAboutUs() {
    const dialogRef = this.dialog.open(AboutUsComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  changeSelectedLanguage(code: string) {
    this.selectedLanguage = this.languages.find(lang => lang.code == code)?.name!!;

    this.translate.use(code);
  }
}
