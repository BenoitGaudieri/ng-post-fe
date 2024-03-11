import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostItemComponent } from '../post-item/post-item.component';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { Subscription } from 'rxjs';

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
  currentPage: number = 1;
  postsPerPage = 10;
  private currentPageSub: Subscription;

  constructor(private searchService: SearchService) {
    this.currentPageSub = this.searchService.currentPage$.subscribe((page) => {
      this.currentPage = page;
    });
  }

  ngOnDestroy() {
    if (this.currentPageSub) {
      this.currentPageSub.unsubscribe();
    }
  }

  nextPage(): void {
    const newPage = this.currentPage + 1;
    if (newPage <= this.numberOfPages) {
      this.searchService.setCurrentPage(newPage);
    }
  }

  previousPage(): void {
    const newPage = this.currentPage - 1;
    if (newPage >= 1) {
      this.searchService.setCurrentPage(newPage);
    }
  }

  get numberOfPages(): number {
    return Math.ceil(this.posts.length / this.postsPerPage);
  }

  get paginatedPosts(): Post[] {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    return this.posts.slice(startIndex, startIndex + this.postsPerPage);
  }
}
