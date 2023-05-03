import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/User';
import { UserService } from 'src/app/core/services/user/user.service';
import { PublicationService } from 'src/app/feed/publication.service';
import { LoginService } from 'src/app/login/login.service';
import { NotificationService } from 'src/app/notifications/notification.service';

@Component({
  selector: 'app-conexion-list',
  templateUrl: './conexion-list.component.html',
  styleUrls: ['./conexion-list.component.scss']
})
export class ConexionListComponent implements OnInit {

  applicants: User[] = [];
  userConections: number[] = [];

  constructor(private publicationService: PublicationService, private userService: UserService,
              private notificationService: NotificationService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.userService.getUserConections().subscribe(
      conections => {
        this.userConections = conections.map(user => user.id);
      }
    )

    this.publicationService.getApplicantsToUser().subscribe(
      applicants => {
        this.applicants = applicants;
      }
    )
  }

  onAccepted(id: number) {
    this.userService.acceptUserConection(id).subscribe(
      res => this.ngOnInit()
    );

    this.notificationService.createNotification(
      `El usuario ${this.loginService.getActiveUser().name} ${this.loginService.getActiveUser().surname}
       ha aceptado tu solicitud de conexión! Ahora ya puedes hablar con él.`,
      id
    ).subscribe()
  }

  onRejected(id: number) {
    this.publicationService.rejectApplicant(id).subscribe(
      res => this.ngOnInit()
    )
  }

}
