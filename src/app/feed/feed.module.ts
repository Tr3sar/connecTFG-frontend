import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PublicationListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeedModule { }
