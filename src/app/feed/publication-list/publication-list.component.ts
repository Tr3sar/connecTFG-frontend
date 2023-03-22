import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { PublicationService } from '../publication.service';


@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {
  posts: Post[];
  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.publicationService.getAllPosts().subscribe(
      posts => this.posts = posts
    )
  }


  onShowComments(): void {

  }

  onLike(): void {

  }
}
