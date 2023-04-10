import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConexionListComponent } from './conexion-list/conexion-list.component';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ConexionListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ]
})
export class ConexionesModule { }
