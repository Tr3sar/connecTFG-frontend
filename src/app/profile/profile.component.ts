import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../core/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent {
  user: User
  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  onEditPost() {

  }
  onEditProfile() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
}
onEditSummary() {
  throw new Error('Method not implemented.');
  }
  onEditExperience() {
  throw new Error('Method not implemented.');
  }
  onEditSocial() {
  throw new Error('Method not implemented.');
  }
  onEditTFG() {
  throw new Error('Method not implemented.');
  }

}
