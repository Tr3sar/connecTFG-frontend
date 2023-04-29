import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from '../model/page/pageable';
import { Post } from '../model/post.model';
import { MatTableDataSource } from '@angular/material/table';
import { PublicationService } from '../publication.service';
import { PublicationSaveComponent } from '../publication-save/publication-save.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/login/login.service';
import { PublicationCommentComponent } from '../publication-comment/publication-comment.component';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  posts: Post[];
  dataSource = new MatTableDataSource<Post>();
  constructor(private publicationService: PublicationService, public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }

    if (event != null) {
      pageable.pageSize = event.pageSize
      pageable.pageNumber = event.pageIndex;
    }

    this.publicationService.getAllPosts(pageable).subscribe(data => {
      this.posts = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

  }
  onPostularClicked(post: Post) {
    if (post.applicants == undefined) {
      post.applicants = []
    }
    if (post.applicants.includes(this.loginService.getUserId())) {
      this.publicationService.rejectApplicant(post.author.id).subscribe(res => { })
    } else {
      this.publicationService.addApplicant(post.id).subscribe(res => { })
      console.log(post.applicants)
    }
    console.log(post)
  }
  onShowComments(post: Post) {
    console.log(post)
    const dialogRef = this.dialog.open(PublicationCommentComponent, {
      data: { post }

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onLike(): void {
  }

  onCreate() {
    const dialogRef = this.dialog.open(PublicationSaveComponent, {
      data: {}
    });
  }
}
