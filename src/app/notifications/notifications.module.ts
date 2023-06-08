import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotificatonListComponent } from './notificaton-list/notificaton-list.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    NotificatonListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class NotificationsModule { }
