import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostItemComponent } from '../post-item/post-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostItemComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  isGridView: boolean = false;

  toggleView() {
    this.isGridView = !this.isGridView;
  }
}
