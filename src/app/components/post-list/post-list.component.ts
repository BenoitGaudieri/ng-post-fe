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
  @Input() isGridView: boolean = false;

  currentPage = 1;
  postsPerPage = 10;

  // Calculate the number of pages
  get numberOfPages(): number {
    return Math.ceil(this.posts.length / this.postsPerPage);
  }

  // Slice the posts for the current page
  get paginatedPosts(): Post[] {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    return this.posts.slice(startIndex, startIndex + this.postsPerPage);
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
    }
  }

  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
