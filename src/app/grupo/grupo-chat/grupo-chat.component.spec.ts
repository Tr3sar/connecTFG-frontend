import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GrupoChatComponent } from './grupo-chat.component';
import { SocketService } from 'src/app/core/services/socket/socket.service';
import { GrupoService } from '../grupo.service';
import { LoginService } from 'src/app/login/login.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../model/Message';
import { User } from 'src/app/core/model/User';
import { Group } from '../model/Group';

describe('GrupoChatComponent', () => {
  let component: GrupoChatComponent;
  let fixture: ComponentFixture<GrupoChatComponent>;

  let socketServiceSpy: jasmine.SpyObj<SocketService>;
  let grupoServiceSpy: jasmine.SpyObj<GrupoService>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const socketServiceSpyObj = jasmine.createSpyObj('SocketService', ['getSelectedGroup', 'getMessages', 'sendMessage', 'joinGroup', 'leaveGroup']);
    const grupoServiceSpyObj = jasmine.createSpyObj('GrupoService', ['getGroupWithUser', 'getMessagesFromGroup', 'createMessage', 'saveGroup']);
    const loginServiceSpyObj = jasmine.createSpyObj('LoginService', ['getActiveUser', 'getUserId']);
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUserById']);

    await TestBed.configureTestingModule({
      declarations: [GrupoChatComponent],
      providers: [
        { provide: SocketService, useValue: socketServiceSpyObj },
        { provide: GrupoService, useValue: grupoServiceSpyObj },
        { provide: LoginService, useValue: loginServiceSpyObj },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 123 } } } },
        { provide: UserService, useValue: userServiceSpyObj }
      ]
    }).compileComponents();

    socketServiceSpy = TestBed.inject(SocketService) as jasmine.SpyObj<SocketService>;
    grupoServiceSpy = TestBed.inject(GrupoService) as jasmine.SpyObj<GrupoService>;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    fixture = TestBed.createComponent(GrupoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send message on button click', fakeAsync(() => {
    const selectedGroup: Group = {
      id: 642863280530736,
      name: 'Grup verd',
      members: [],
      messages: [],
      files: []
    };
    const activeUser: User = {
      id: 6428484113206182219,
      name: 'Josep',
      surname: 'Martín Torres',
      email: 'josepcdg@gmail.com',
      password: '1234',
      img_url: '',
      tfg_url: '',
      description: `Estudiant d'Enginyería Informàtica`,
      university_id: 0,
      degree: '',
      rol: '',
      status: ''
    };
    const messageToSend = 'Missatge de prova';
    const selectedFile = {
      href: '',
      filename: ''
    };
  
    const mockMessage: Message = {
      emitter: activeUser,
      text: messageToSend,
      file: selectedFile
    };
  
    component.sendMessage();
  
    expect(grupoServiceSpy.createMessage).toHaveBeenCalledWith(selectedGroup.id, activeUser.id, messageToSend, undefined);
    expect(socketServiceSpy.sendMessage).toHaveBeenCalledWith(selectedGroup.id, mockMessage);
  
    tick(); // Simulate asynchronous operations if any
  
    // Check if the message is added to the messages array
    expect(component.messages).toContain(mockMessage);
  
    // Additional expectations if needed
  }));
});
