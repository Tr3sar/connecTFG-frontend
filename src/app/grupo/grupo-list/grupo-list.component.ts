import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../grupo.service';
import { Group } from '../model/Group';
import { MatDialog } from '@angular/material/dialog';
import { GrupoEditComponent } from '../grupo-edit/grupo-edit.component';
import { SocketService } from 'src/app/core/services/socket/socket.service';

@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.scss']
})
export class GrupoListComponent implements OnInit {

  selectedGroup: Group;

  groups: Group[];
  constructor(private groupService: GrupoService, private socketService: SocketService, public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe(
      groups => { this.groups = groups; console.log('Groups', groups)}
    )
  }

  onChangeSelectedGroup(group: Group) {

    if(this.selectedGroup != null) {
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