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
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-grupo-edit',
  templateUrl: './grupo-edit.component.html',
  styleUrls: ['./grupo-edit.component.scss']
})
export class GrupoEditComponent implements OnInit {

  userCtrl = new FormControl('');

  group: Group;

  filteredUsers: Observable<User[]>;
  allUsers: User[];


  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>

  constructor(public dialogRef: MatDialogRef<GrupoEditComponent>, private groupService: GrupoService,
              private userService: UserService, public loginService: LoginService, @Inject(MAT_DIALOG_DATA) public data: any) {


     this.userService.getUserConections().subscribe(
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
    
    if (this.group.members.filter(member => member.id == this.loginService.getUserId()).length == 0) {
      this.group.members.push(this.loginService.getActiveUser());
    }
  }

  remove(user: User): void {
    if (user.id === this.loginService.getUserId()) { return ; }

    const indexGroup = this.group.members.indexOf(user);
    
    if(indexGroup >= 0) {
      this.group.members.splice(indexGroup, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const userValue = event.option.value

    if (!userValue) { alert('Ha habido un error'); return; }
    if (this.group.members.includes(userValue)) { return ; }

    this.group.members.push(userValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): User[] {
    const filterValue = value.toString().toLowerCase();

    return this.allUsers.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  onClose() {
    if (this.group.id != null) {
      location.reload();
    }
    
    this.dialogRef.close();
  }

  onSave() {
    if (this.group.name.trim() == "") { return; }
    if (this.group.members == undefined) {
      this.group.members = [];
    }

    this.groupService.saveGroup(this.group).subscribe(result => {
      location.reload()
      this.dialogRef.close();
    });
  }

}