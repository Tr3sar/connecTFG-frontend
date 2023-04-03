import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from '../model/page/pageable';
import { Post } from '../model/post.model';
import { MatTableDataSource } from '@angular/material/table';
import { PublicationService } from '../publication.service';
import { PublicationSaveComponent } from '../publication-save/publication-save.component';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(private publicationService: PublicationService, public dialog: MatDialog) { }

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
      console.log(data)
    });

  }

  onShowComments(): void {
  }

  onLike(): void {
  }

  onCreate() {
    const dialogRef = this.dialog.open(PublicationSaveComponent, {
      data: {}
    });
}
}
