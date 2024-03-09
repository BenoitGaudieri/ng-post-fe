import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DataService } from '../services/data.service';
import { Post } from '../interfaces/post.interface';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { PostListComponent } from '../components/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-main',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SpinnerComponent,
    PostListComponent,
    FormsModule,
  ],
  providers: [DataService],
  templateUrl: './post-main.component.html',
  styleUrl: './post-main.component.scss',
})
export class PostMainComponent {
  posts: Post[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  searchTerm: string = '';

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

  filterPosts() {
    if (this.searchTerm) {
      this.posts = this.posts.filter((post) => {
        const user = this.dataService.getUserById(post.userId);
        return (
          user &&
          user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    } else {
      this.dataService.getPosts().subscribe((posts) => {
        this.posts = posts;
      });
    }
  }
}
