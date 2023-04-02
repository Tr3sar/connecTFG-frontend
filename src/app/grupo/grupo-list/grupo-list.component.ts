import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../grupo.service';
import { Group } from '../model/Group';
import { MatDialog } from '@angular/material/dialog';
import { GrupoEditComponent } from '../grupo-edit/grupo-edit.component';
import { SocketService } from 'src/app/core/services/socket/socket.service';
import { User } from 'src/app/core/model/User';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.scss']
})
export class GrupoListComponent implements OnInit {

  selectedGroup: Group;

  groups: Group[];

  userJosep: User;
  userMatias: User;
  constructor(private groupService: GrupoService, private socketService: SocketService, public dialog: MatDialog,
    private userService: UserService) {

  }

  ngOnInit(): void {
    //llevar timeouts quan estiga el login
    setTimeout(() => {
      this.userJosep = this.userService.getJosepExample()
      this.userMatias = this.userService.getMatiasExample();

    }, 100)

    setTimeout(() => {
      this.groupService.getGroupsFromUser(this.userJosep.id).subscribe(
        groups => { this.groups = groups; console.log('Groups', groups) }
      )
    }, 200)
  }

  onChangeSelectedGroup(group: Group) {

    if (this.selectedGroup != null) {
      this.socketService.leaveGroup(this.selectedGroup.id)
    }

    this.selectedGroup = group;

    this.socketService.joinGroup(group)
  }

  onCreateGroup() {
    const dialogRef = this.dialog.open(GrupoEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}