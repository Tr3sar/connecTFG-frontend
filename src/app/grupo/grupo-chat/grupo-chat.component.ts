import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/model/User';
import { SocketService } from 'src/app/core/services/socket/socket.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { GrupoService } from '../grupo.service';
import { Group } from '../model/Group';
import { Message } from '../model/Message';
import { GrupoEditComponent } from '../grupo-edit/grupo-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-grupo-chat',
  templateUrl: './grupo-chat.component.html',
  styleUrls: ['./grupo-chat.component.scss']
})
export class GrupoChatComponent implements OnInit {

  selectedGroup: Group | null;

  messageToSend: string;
  messages: Message[] = [];

  loading: boolean = false;

  constructor(private grupoService: GrupoService, private socketService: SocketService, public loginService: LoginService,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    this.loading = true;

    this.socketService.getSelectedGroup().subscribe(group => {
      this.selectedGroup = group;

      if (this.selectedGroup == null) { 
        this.loading = false;
        return ;
       }

      this.grupoService.getMessagesFromGroup(this.selectedGroup.id).subscribe(messages => {
        console.log('Messages', messages)
        this.messages = messages;
        this.loading = false;
      })
    },
    err => {
      this.loading = false;
    })

    this.socketService.getMessages().subscribe(message => {
      this.messages.push(message)
      this.loading = false;
    },
    err => {
      this.loading = false;
    })
  }

  sendMessage() {
    if (this.messageToSend.trim() == '') { return; }
    if (this.selectedGroup == null) { return ; }

    this.grupoService.createMessage(this.selectedGroup.id, this.loginService.getUserId()!!, this.messageToSend).subscribe(
      response => { }
    )

    let message : Message = {emitter: this.loginService.getActiveUser(), text: this.messageToSend}

    this.socketService.sendMessage(this.selectedGroup.id, message)
    this.messageToSend = '';
  }
}
