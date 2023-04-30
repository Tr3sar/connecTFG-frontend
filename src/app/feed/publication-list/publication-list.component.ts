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
  filterValue = 'Open';
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  posts: Post[];
  dataSource = new MatTableDataSource<Post>();
  
  pageable: Pageable = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    sort: [{
      property: 'id',
      direction: 'ASC'
    }]
  }

  constructor(private publicationService: PublicationService, public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
    this.onValChange()
    this.loadPage();
    
  }

  loadPage(event?: PageEvent) {

    

    if (event != null) {
      this.pageable.pageSize = event.pageSize
      this.pageable.pageNumber = event.pageIndex;
    }

    this.publicationService.getAllPosts(this.pageable, this.filterValue).subscribe(data => {
      console.log(data)
      this.posts = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

  }
  onPostularClicked(post: Post) {
    if (post.closed=true) {
      alert('Post is Closed. Postularse is not available');
    }else{
      if (post.applicants == undefined) {
        post.applicants = []
      }
      if (post.applicants.includes(this.loginService.getUserId())) {
        this.publicationService.rejectApplicant(post.author.id).subscribe(res => { })
      } else {
        this.publicationService.addApplicant(post.id).subscribe(res => { })
        console.log(post.applicants)
      }
  }
}
  onValChange(){
    this.publicationService.getAllPosts(this.pageable, this.filterValue).subscribe(res => {
      this.posts = res.content;
      this.pageNumber = res.pageable.pageNumber;
      this.pageSize = res.pageable.pageSize;
      this.totalElements = res.totalElements;
    })
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
