import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatSidenavModule} from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { SocketService } from '../core/services/socket/socket.service';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    HttpClientModule,
    NgxLoadingModule,
    MatMenuModule
  ],
  providers: [
    SocketService,
        
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    }
  ]
})
export class ProfileModule { }
