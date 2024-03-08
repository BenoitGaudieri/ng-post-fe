import { Component, Input } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  @Input() post: Post = {} as Post;
  @Input() user: User = {} as User;

  constructor(private cardService: CardService) {}

  closeDetail() {
    this.cardService.closeCard();
  }
}
