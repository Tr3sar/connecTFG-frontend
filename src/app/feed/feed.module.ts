import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    PublicationListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class FeedModule {
}
