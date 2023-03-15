import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConexionListComponent } from './conexion-list/conexion-list.component';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ConexionListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ConexionesModule { }
