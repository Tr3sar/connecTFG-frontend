import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/model/User';
import { SocketService } from 'src/app/core/services/socket/socket.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { GrupoService } from '../grupo.service';
import { Group } from '../model/Group';
import { Message } from '../model/Message';
import { GrupoEditComponent } from '../grupo-edit/grupo-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-grupo-chat',
  templateUrl: './grupo-chat.component.html',
  styleUrls: ['./grupo-chat.component.scss']
})
export class GrupoChatComponent implements OnInit {

  selectedGroup: Group | null;

  messageToSend: string;
  messages: string[] = [];

  userExample: User;

  constructor(private grupoService: GrupoService, private userService: UserService, private socketService: SocketService,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(
      users => this.userExample = users[1]
    );

    this.socketService.getSelectedGroup().subscribe(group => {
      this.selectedGroup = group;

      if (this.selectedGroup == null) { return ; }

      this.grupoService.getMessagesFromGroup(this.selectedGroup.id).subscribe(messages => {
        this.messages = messages.map(message => message.text);
      })
    })

    this.socketService.getMessages().subscribe(message => {
      this.messages.push(message)
    })
  }

  sendMessage() {
    if (this.messageToSend.trim() == '') { return; }
    if (this.selectedGroup == null) { return ; }

    this.grupoService.createMessage(this.selectedGroup.id, this.userExample.id, this.messageToSend).subscribe(
      response => {
        console.log('Response al crear mensaje', response)
      }
    )
    this.socketService.sendMessage(this.selectedGroup.id, this.messageToSend)
    this.messageToSend = '';
  }

  onEditGroup() {
    const dialogRef = this.dialog.open(GrupoEditComponent, {
      data: { group: this.selectedGroup }
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload()
      this.ngOnInit();
    });
  }

}
