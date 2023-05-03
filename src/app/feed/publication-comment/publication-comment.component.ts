import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../model/post.model';
import { LoginService } from 'src/app/login/login.service';
import { PublicationService } from '../publication.service';
import { Comment } from '../model/comment.model';

@Component({
  selector: 'app-publication-comment',
  templateUrl: './publication-comment.component.html',
  styleUrls: ['./publication-comment.component.scss']
})
export class PublicationCommentComponent {
  post: Post
  commentToSend: string = ""
  constructor(public dialogRef: MatDialogRef<PublicationCommentComponent>, public publicationService: PublicationService, private loginService: LoginService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.post != null) {
      this.post = Object.assign({}, this.data.post);
    }
    else {
      this.post = new Post();
    }
  }
  createComment() {
    if (this.commentToSend.trim() == '') { return; }

    this.publicationService.createComment(this.post.id, this.commentToSend).subscribe(
      response => {
        this.post.comments.push(response)
      }
    )
    this.commentToSend = '';
  }
}

