import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'

import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button'
import { MatBadgeModule } from '@angular/material/badge'

import {AsyncPipe} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

import { TranslateModule } from '@ngx-translate/core';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    HeaderComponent,
    DialogConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatBadgeModule,
    TranslateModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
