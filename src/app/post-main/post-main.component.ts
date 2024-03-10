import { Component } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { DataService } from '../services/data.service';
import { Post } from '../interfaces/post.interface';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { PostListComponent } from '../components/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-main',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SpinnerComponent,
    PostListComponent,
    SearchBarComponent,
  ],
  providers: [DataService],
  templateUrl: './post-main.component.html',
  styleUrl: './post-main.component.scss',
})
export class PostMainComponent {
  allPosts: Post[] = [];
  posts: Post[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  private searchTermSubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();

  constructor(
    private dataService: DataService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    forkJoin({
      users: this.dataService.getUsers(),
      posts: this.dataService.getPosts(),
    }).subscribe({
      next: ({ users, posts }) => {
        this.dataService.setUsers(users);
        this.allPosts = posts;
        this.posts = posts;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = true;
        this.isLoading = false;
        console.error(error);
      },
    });

    this.searchTermSubscription = this.searchService.searchTerm$.subscribe(
      (term) => {
        this.filterPosts(term);
      }
    );

    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      const searchTerm = params['searchTerm'];
      if (searchTerm) {
        this.filterPosts(searchTerm);
      }
    });
  }

  ngOnDestroy() {
    this.searchTermSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  filterPosts(searchTerm: string) {
    if (searchTerm) {
      this.posts = this.allPosts.filter((post) => {
        const user = this.dataService.getUserById(post.userId);
        return (
          user && user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    } else {
      this.posts = this.allPosts; // Reset posts to allPosts when searchTerm is empty
    }
  }
}
