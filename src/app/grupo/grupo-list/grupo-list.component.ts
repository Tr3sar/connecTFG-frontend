import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../grupo.service';
import { Group } from '../model/Group';
import { MatDialog } from '@angular/material/dialog';
import { GrupoEditComponent } from '../grupo-edit/grupo-edit.component';
import { SocketService } from 'src/app/core/services/socket/socket.service';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.scss']
})
export class GrupoListComponent implements OnInit {

  selectedGroup: Group;

  groups: Group[];

  loading: boolean = false;

  constructor(private groupService: GrupoService, private socketService: SocketService, public dialog: MatDialog) {

  }

  ngOnInit(): void {    
    this.loading = true;
    this.groupService.getGroupsFromUser().subscribe(
      groups => { 
        this.groups = groups; 
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    )

    this.socketService.selectedGroupSubject.subscribe(
      group => {
        if (group == null) { location.reload() }
      }
    )
  }

  onChangeSelectedGroup(group: Group) {
    if (this.selectedGroup && group.id == this.selectedGroup.id) {
      return ;
    }

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

  deleteGroup(id : number) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { 
        title: "Eliminar grupo",
        description: "Atención! Si borra el grupo se perderán sus datos.<br> ¿Desea eliminar el grupo?"
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteGroupById(id).subscribe(
          res => this.ngOnInit()
        )
      }
    })
  }

  editGroup(group: Group) {
    const dialogRef = this.dialog.open(GrupoEditComponent, {
      data: { group: group }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    },
    err => {
      this.loading = false;
    });
  }
}