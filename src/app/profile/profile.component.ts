import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../core/model/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core/services/user/user.service';
import { PublicationService } from '../feed/publication.service';
import { LoginService } from '../login/login.service';
import { Post } from '../feed/model/post.model';
import { DialogConfirmationComponent } from '../core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent {
  userId: string;
  user: User
  posts: Post[] = [];
  constructor(public dialog: MatDialog,private route: ActivatedRoute,public loginService:LoginService, private userService: UserService, public publicationService: PublicationService) {

  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] != undefined) {
      const id = this.route.snapshot.params['id'];
      this.userId = id;
  
      this.userService.getUserById(id).subscribe(
        (user) => {
          this.user = user;
        },
        (err) => {
          console.log("Este usuario no está disponible");
        }
      );
  
      // Obtener los posts del usuario
      this.publicationService.getPostsFromUser(id).subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        },
        (err) => {
          console.log("Error al obtener los posts del usuario");
        }
      );
    }
  }
  onCerrarClicked(id: number) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: "Cerrar Post",
        description: "Atención! Si cierra el Post, no se podrá postular más gente.<br> ¿Desea cerrar el post?"
      }
      
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        // User confirmed to close the post
        const postToUpdate: Post = {
          id: id,
          closed: true,
          author: new User,
          title: '',
          content: '',
          applicants: [],
          likes: 0,
          comments: [],
          createdAt: new Date(),
        };
  
        this.publicationService.cerrarPost(postToUpdate).subscribe(
          updatedPost => {
            // Post updated successfully
            console.log('Post updated:', updatedPost);
          },
          error => {
            // Error occurred while updating the post
            console.error('Error updating post:', error);
          }
        );
      }
    });
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
onEditSocial() {
  throw new Error('Method not implemented.');
  }
 onEditTFG() {
  throw new Error('Method not implemented.');
  }

}

