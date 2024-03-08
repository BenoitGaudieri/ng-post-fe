import { Component, Input } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { PostDetailComponent } from '../post-detail/post-detail.component';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [PostDetailComponent],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  @Input() post: Post = {} as Post;
}
