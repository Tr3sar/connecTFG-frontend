import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PublicationListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    HttpClientModule
  ]
})

export class FeedModule {
}
