import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { User } from '../../interfaces/user.interface';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, PostDetailComponent],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  @Input() post: Post = {} as Post;
  user: User = {} as User;
  showDetails = false;

  constructor(
    private dataService: DataService,
    private cardService: CardService
  ) {}

  ngOnInit() {
    this.user = this.dataService.getUserById(this.post.userId) || this.user;
    this.cardService.currentOpenCard.subscribe((cardId) => {
      this.showDetails = this.post.id === cardId;
    });
  }

  openDetail() {
    this.cardService.openCard(this.post.id);
  }

  getInitials(name: string) {
    let initials = name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('');
    return initials.toUpperCase();
  }
}
