import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { Group } from 'src/app/grupo/model/Group';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  SOCKET_ENDPOINT: string = 'http://localhost:3000';
  socket: Socket;

  messagesSubject = new Subject<any>();
  selectedGroupSubject = new Subject<Group | null>();

  //selectedGroup: string = '';

  constructor() {
    this.setupSocketConnection();
  }
  

  setupSocketConnection() {
    this.socket = io(this.SOCKET_ENDPOINT)

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
    this.socket.emit('join', group.id);
    this.setSelectedGroup(group)
  }

  leaveGroup(groupId: number) {
    this.socket.emit('leave', groupId)
  }

  sendMessage(groupId: number, message: string) {
    this.socket.emit('newMessage', {groupId, message})
  }

  getMessages() : Observable<any> {
    return this.messagesSubject.asObservable();
  }

  setSelectedGroup(group: Group | null) {
    //this.selectedGroup = groupId;
    this.selectedGroupSubject.next(group);
  }

  getSelectedGroup() : Observable<Group | null>{
    return this.selectedGroupSubject.asObservable();
  }
}
