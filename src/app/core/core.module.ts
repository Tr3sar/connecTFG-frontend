import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button'

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule
    
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
