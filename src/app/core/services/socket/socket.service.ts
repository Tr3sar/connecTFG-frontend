import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { Group } from 'src/app/grupo/model/Group';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login/login.service';
import { Message } from '../../../grupo/model/Message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  SOCKET_ENDPOINT: string = environment.urlService;
  socket: Socket;

  messagesSubject = new Subject<any>();
  selectedGroupSubject = new Subject<Group | null>();

  constructor(private loginService: LoginService) {
    setTimeout(() => {
      this.setupSocketConnection();
    }, 300)
  }


  setupSocketConnection() {
    this.socket = io(this.SOCKET_ENDPOINT, {
      query: {
        userId: this.loginService.getUserId()
      }
    })

    this.socket.on('connect', () => {
      console.log('Conectado al servidor de WebSocket');
    });

    this.socket.on('message', (message: any) => {
      console.log('Nuevo mensaje recibido del servidor: ', message);
      this.messagesSubject.next(message)
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor de WebSocket');
    });
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  joinGroup(group: Group) {
    if (this.socket == undefined) {
      setTimeout(() => {
        this.socket.emit('join', group.id);
        this.setSelectedGroup(group)
      }, 500)
    } else {
      this.socket.emit('join', group.id);
      this.setSelectedGroup(group)
    }
  }

  leaveGroup(groupId: number) {
    this.socket.emit('leave', groupId)
  }

  sendMessage(groupId: number, message: Message) {
    this.socket.emit('newMessage', { groupId, message })
  }

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  setSelectedGroup(group: Group | null) {
    this.selectedGroupSubject.next(group);
  }

  getSelectedGroup(): Observable<Group | null> {
    return this.selectedGroupSubject.asObservable();
  }
}
