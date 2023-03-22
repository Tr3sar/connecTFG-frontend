import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../grupo.service';
import { Group } from '../model/Group';
import { MatDialog } from '@angular/material/dialog';
import { GrupoEditComponent } from '../grupo-edit/grupo-edit.component';

@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.scss']
})
export class GrupoListComponent implements OnInit {

  selectedChatId: number;

  groups: Group[];

  constructor(private groupService: GrupoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.groupService.getAllGroups().subscribe(
      groups => this.groups = groups
    )
  }

  onChangeSelectedGroup(id: number) {
    this.selectedChatId = id;
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