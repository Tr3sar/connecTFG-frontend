import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoListComponent } from './grupo-list/grupo-list.component';
import { GrupoChatComponent } from './grupo-chat/grupo-chat.component';
import { GrupoEditComponent } from './grupo-edit/grupo-edit.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';

import { SocketService } from '../core/services/socket/socket.service';


@NgModule({
  declarations: [
    GrupoListComponent,
    GrupoChatComponent,
    GrupoEditComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    HttpClientModule,
    NgxLoadingModule
  ],
  providers: [
    SocketService,
        
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    }
  ]
})
export class GrupoModule { }
