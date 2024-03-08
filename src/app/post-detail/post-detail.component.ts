import { Component, Input } from '@angular/core';
import { Post } from '../interfaces/post.interface';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  @Input() post: Post = {} as Post;
}
