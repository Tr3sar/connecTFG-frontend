import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from '../model/page/pageable';
import { Post } from '../model/post.model';
import { MatTableDataSource } from '@angular/material/table';
import { PublicationService } from '../publication.service';
import { PublicationSaveComponent } from '../publication-save/publication-save.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/login.service';
import { PublicationCommentComponent } from '../publication-comment/publication-comment.component';
import { Comment } from '../model/comment.model';
import { NotificationService } from 'src/app/notifications/notification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { NotificationType } from 'src/app/notifications/model/NotificationType';

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
      property: 'createdAt',
      direction: 'ASC'
    }]
  }
  searchValue: any;

  constructor(private publicationService: PublicationService, private snackBar: MatSnackBar,public dialog: MatDialog,
              private loginService: LoginService, private notificationService: NotificationService, private userService: UserService) { }

  ngOnInit(): void {
    this.onValChange();
    this.loadPage();
   
    this.onSearchPost()
  }

  loadPage(event?: PageEvent) {

    

    if (event != null) {
      this.pageable.pageSize = event.pageSize
      this.pageable.pageNumber = event.pageIndex;
    }

    this.publicationService.getAllPosts(this.pageable, this.filterValue).subscribe(data => {
      this.posts = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

  }
  onPostularClicked(post: Post) {
    if (post.closed==true) {
      this.snackBar.open('Esta oferta fue cerrada! Ya no se reciben postulaciones.', 'Cerrar', {
        duration: 3000
      });
    }else{
      if (post.applicants == undefined) {
        post.applicants = []
      }
      if (post.applicants.includes(this.loginService.getUserId())) {
        this.publicationService.rejectApplicant(post.author.id).subscribe(res => { })
      } else {
        this.publicationService.addApplicant(post.id).subscribe(res => { 
          this.userService.getUserConections().subscribe(
            conections => {
              if (!conections.includes(post.author)) {
                this.notificationService.createNotification(NotificationType.POST, this.loginService.getUserId(), post.author.id).subscribe();
              }
            }
          )
        })
      }
      this.postularClicked.emit(post);
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
  @Output() postularClicked: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() showComments: EventEmitter<Post> = new EventEmitter<Post>();
  onSearchPost() {
    if (this.searchValue) {
      this.publicationService.getAllPosts(this.pageable, this.searchValue).subscribe(
        res => {
          try {
            console.log("Search value:", this.searchValue);
            console.log("Response:", res);
  
            const filteredPosts = res.content.filter(post => {
              console.log("Post:", post);
              if (post && post.title && typeof post.title === 'string') {
                console.log("Post title:", post.title);
                return post.title.toLowerCase().includes(this.searchValue.toLowerCase());
              }
              return false;
            });
  
            console.log("Filtered posts:", filteredPosts);
  
            this.posts = filteredPosts;
            this.pageNumber = res.pageable.pageNumber;
            this.pageSize = res.pageable.pageSize;
            this.totalElements = res.totalElements;
          } catch (error) {
            console.error(error);
          }
        },
        error => {
          console.error(error);
        }
      );
    } else {
      // If the search value is empty, retrieve all posts
      this.publicationService.getAllPosts(this.pageable,this.filterValue).subscribe(
        res => {
          this.posts = res.content;
          this.pageNumber = res.pageable.pageNumber;
          this.pageSize = res.pageable.pageSize;
          this.totalElements = res.totalElements;
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  
  

  onShowComments(post: Post) {
    const dialogRef = this.dialog.open(PublicationCommentComponent, {
      data: { post }
    });
  
    dialogRef.afterClosed().subscribe((newComment: Comment) => {
      if (newComment) {
        const postIndex = this.posts.findIndex(p => p.id === post.id);
        if (postIndex !== -1) {
          // Find the updated comment in the post's comments array
          const commentIndex = this.posts[postIndex].comments.findIndex(c => c.id === newComment.id);
          if (commentIndex !== -1) {
            // Update the comment with the new data
            this.posts[postIndex].comments[commentIndex] = newComment;
          }
        }
      }
    });
    this.showComments.emit(post);
  }

  onLike(): void {
  }

  onCreate() {
    const dialogRef = this.dialog.open(PublicationSaveComponent, {
      data: {}
    });
  }
}
