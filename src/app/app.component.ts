import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataService } from './services/data.service';
import { Post } from './interfaces/post.interface';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SpinnerComponent,
    PostListComponent,
  ],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ex-01';

  posts: Post[] = [];
  isLoading = true;
  error = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    forkJoin({
      users: this.dataService.getUsers(),
      posts: this.dataService.getPosts(),
    }).subscribe({
      next: ({ users, posts }) => {
        this.dataService.setUsers(users);
        this.posts = posts;
        this.isLoading = false;
        console.log('success', this.posts, users);
      },
      error: (error) => {
        this.error = true;
        this.isLoading = false;
        console.error(error);
      },
    });
  }
}
