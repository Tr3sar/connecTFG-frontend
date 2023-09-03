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
import { ProfileService } from './profile.service';
import { EditProfileDialogComponent } from './dialog-profile-edit/edit-profile-dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent {
  userId: string;
  user: User
  posts: Post[] = [];
  constructor(public dialog: MatDialog,private route: ActivatedRoute,public loginService:LoginService, private ProfileService: ProfileService ,private userService: UserService, public publicationService: PublicationService) {

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

  onCerrarClicked(post: Post) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: "Cerrar Post",
        description: "Atención! Si cierra el Post, no se podrá postular más gente.<br> ¿Desea cerrar el post?"
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(post)
        post.closed = true; 
        console.log(post)
        this.publicationService.cerrarPost(post).subscribe(res =>{})
        console.log("OnCerrarClicked Post")
      }
    });
    
  }

  onEditPost() {

  }

  onEditProfile() {
    console.log("Toqué")
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        user: { ...this.user }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = { ...result };
        this.userService.editUser().subscribe(res=>{})
      }
    });
  }

}

