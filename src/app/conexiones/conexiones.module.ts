import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConexionListComponent } from './conexion-list/conexion-list.component';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ConexionListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class ConexionesModule { }
