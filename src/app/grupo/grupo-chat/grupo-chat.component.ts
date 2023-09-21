import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket/socket.service';
import { GrupoService } from '../grupo.service';
import { Group } from '../model/Group';
import { Message } from '../model/Message';
import { LoginService } from 'src/app/login/login.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-grupo-chat',
  templateUrl: './grupo-chat.component.html',
  styleUrls: ['./grupo-chat.component.scss']
})
export class GrupoChatComponent implements OnInit {

  selectedGroup: Group | null;
  selectedFile: File | null;

  messageToSend: string;
  messages: Message[] = [];

  loading: boolean = false;

  constructor(private grupoService: GrupoService, private socketService: SocketService, public loginService: LoginService,
    private cdref: ChangeDetectorRef, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;

    if (this.route.snapshot.params['id'] != undefined) {
      //Buscar grup on estiguen els dos (mirar com fer-ho)
      //Assiignar-lill a selectedGroup
      //Si envien algún missatge, crear el grup
      let userId = this.route.snapshot.params['id']
      this.grupoService.getGroupWithUser(userId).subscribe(
        (group: any) => {
          //ja tenen un chat junts

          this.changeSelectedGroup(group[0]);
          this.selectedGroup = group[0];

          if (!this.selectedGroup) {
            return;
          }

          this.grupoService.getMessagesFromGroup(this.selectedGroup.id).subscribe(messages => {
            this.messages = messages;
            this.loading = false;

            this.cdref.detectChanges()
          })
        },
        err => {
          let newGroup = new Group()
          //newGroup.name = "Grupo nuevo"
          newGroup.name = "Grup nou"

          console.log('En el grup nou')

          this.userService.getUserById(userId).subscribe(
            user => {
              newGroup.members = [user, this.loginService.getActiveUser()]
              this.selectedGroup = newGroup
              this.loading = false;
            },
            err => {
              console.log('No existe un usuario con ese id')
            }
          )
        }
      )
    }
    this.socketService.getSelectedGroup().subscribe(group => {
      this.selectedGroup = group;

      if (!this.selectedGroup) {
        this.loading = false;
        return;
      }

      this.grupoService.getMessagesFromGroup(this.selectedGroup.id).subscribe(messages => {
        this.messages = messages;
        this.loading = false;

        this.cdref.detectChanges()
      })
    },
      err => {
        this.loading = false;
      }
    )


    this.socketService.getMessages().subscribe(message => {
      this.messages.push(message)
      this.loading = false;
    },
      err => {
        this.loading = false;
      }
    )
  }

  sendMessage() {
    if (this.messageToSend != undefined && this.messageToSend.trim() == '' && !this.selectedFile) { return; }
    if (this.selectedGroup == null) { return; }

    console.log('Dins de enviar missatge')

    if (!this.selectedFile) { console.log('no fitxer')}

    let message: Message = {
      emitter: this.loginService.getActiveUser(),
      text: this.messageToSend,
      file: this.selectedFile ? {
        href: URL.createObjectURL(this.selectedFile!!),
        filename: this.selectedFile?.name!!,
      } : undefined
    }

    if (this.selectedGroup.id != null) {
      this.grupoService.createMessage(this.selectedGroup.id, this.loginService.getUserId()!!, this.messageToSend, this.selectedFile!!).subscribe(
        response => { }
      )
      this.socketService.sendMessage(this.selectedGroup.id, message)
    } else {
      this.grupoService.saveGroup(this.selectedGroup).subscribe(
        (groupJSON: any) => {
          let group = groupJSON.group
          this.socketService.joinGroup(group)

          this.grupoService.createMessage(group.id, this.loginService.getUserId()!!, message.text, this.selectedFile!!).subscribe(
            response => { }
          )
          this.socketService.sendMessage(group.id, message)
          location.reload();
        }
      )
    }

    this.messageToSend = '';
    this.selectedFile = null;
  }

  private changeSelectedGroup(group: Group) {
    if (this.selectedGroup && group.id == this.selectedGroup.id) {
      return;
    }

    if (this.selectedGroup != null) {
      this.socketService.leaveGroup(this.selectedGroup.id)
    }


    this.selectedGroup = group;

    this.socketService.joinGroup(group)
  }

  onFileSelected(event: any): void {
    const files: FileList | null = event.target.files;
    this.selectedFile = files?.item(0)!!; 
  }
}
