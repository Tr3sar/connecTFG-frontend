import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/model/User';
import { UserService } from 'src/app/core/services/user/user.service';
import { GrupoService } from '../grupo.service';
import { Group } from '../model/Group';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-grupo-edit',
  templateUrl: './grupo-edit.component.html',
  styleUrls: ['./grupo-edit.component.scss']
})
export class GrupoEditComponent implements OnInit {

  userCtrl = new FormControl('');

  group: Group;

  //usersToAdd: User[] = [];
  filteredUsers: Observable<User[]>;
  allUsers: User[];


  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>

  constructor(public dialogRef: MatDialogRef<GrupoEditComponent>, private groupService: GrupoService,
              private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) {


     this.userService.getAllUsers().subscribe(
      users => {
        this.allUsers = users;
        this.filteredUsers = of(users);

        this.filteredUsers = this.userCtrl.valueChanges.pipe(
          startWith(null),
          map((name: string | null) => (name ? this._filter(name) : this.allUsers.slice()))
        )
    }) 
  }

  ngOnInit(): void {
    if (this.data.group != null) {
      this.group = Object.assign({}, this.data.group);
    }
    else {
      this.group = new Group();
      this.group.members = []
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    const userValue = this.userService.getUserByName(value);

    if (userValue) {
      //this.usersToAdd.push(userValue);
      this.group.members.push(userValue)
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(user: User): void {
    //const index = this.usersToAdd.indexOf(user);
    const index = this.group.members.indexOf(user);
    if (index >= 0) {
      //this.usersToAdd.splice(index, 1);
      this.group.members.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const userValue = event.option.value

    if (!userValue) { alert('Ha habido un error'); return; }
    //if (this.usersToAdd.includes(userValue)) { return ;}
    if (this.group.members.includes(userValue)) { return ; }

    //this.usersToAdd.push(userValue);
    this.group.members.push(userValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): User[] {
    const filterValue = value.toString().toLowerCase();

    return this.allUsers.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.group.name.trim() == "") { return; }
    if (this.group.members == undefined) {
      this.group.members = [];
    }
    
    /* this.usersToAdd.forEach((user) => {
      if (!this.group.members.includes(user)) {
        this.group.members.push(user)
      }
    }) */

    console.log('GRUPO EN SERVICE', this.group)
    this.groupService.saveGroup(this.group).subscribe(result => {
      location.reload()
      this.dialogRef.close();
    });
  }

}
