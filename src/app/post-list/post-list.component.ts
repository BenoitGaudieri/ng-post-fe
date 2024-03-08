import { Component, Input } from '@angular/core';
import { Post } from '../interfaces/post.interface';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  @Input() posts: Post[] = [];

  ngOnInit() {
    console.log('posts working', this.posts);
  }
}
