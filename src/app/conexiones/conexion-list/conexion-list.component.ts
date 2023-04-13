import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model/User';
import { UserService } from 'src/app/core/services/user/user.service';
import { PublicationService } from 'src/app/feed/publication.service';

@Component({
  selector: 'app-conexion-list',
  templateUrl: './conexion-list.component.html',
  styleUrls: ['./conexion-list.component.scss']
})
export class ConexionListComponent implements OnInit {

  applicants: User[] = [];
  userConections: number[] = [];

  constructor(private publicationService: PublicationService, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUserConections().subscribe(
      conections => {
        this.userConections = conections;
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
  }

  onRejected(id: number) {
    this.publicationService.rejectApplicant(id).subscribe(
      res => this.ngOnInit()
    )
  }

}
