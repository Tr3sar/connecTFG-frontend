import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/model/User';


@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent {
  user: User;
  newUrl: string;
  

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = { ...data.user };
  }

  saveChanges(): void {
    // Perform the necessary actions to save the changes
    this.dialogRef.close(this.user);
    console.log(this.user.social_url)
  }
  addUrl(): void {
    this.user.social_url.push('');
  }

  removeUrl(index: number): void {
    this.user.social_url.splice(index, 1);
  }
  onUrlKeyUp(event: KeyboardEvent): void {
    event.preventDefault();
  }

  cancel(): void {
    this.dialogRef.close();
    console.log(this.user.social_url)
  }
}