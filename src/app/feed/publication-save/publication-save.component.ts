import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PublicationService } from '../publication.service';
import { LoginService } from 'src/app/login/login.service';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-publication-save',
  templateUrl: './publication-save.component.html',
  styleUrls: ['./publication-save.component.scss']
})
export class PublicationSaveComponent implements OnInit {
  post: Post
  constructor(public dialogRef: MatDialogRef<PublicationSaveComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private publicationService: PublicationService, private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.data.post != null) {
      this.post = Object.assign({}, this.data.post);
    }
    else {
      this.post = new Post();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.post.title.trim() == "") { return; }
    console.log('Publication', this.post)
    this.publicationService.savePost(this.post).subscribe(result => {
      this.dialogRef.close();
    });
  }
}
