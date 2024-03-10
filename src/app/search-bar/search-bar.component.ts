import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchTerm: string = '';

  constructor(private searchService: SearchService, private router: Router) {}

  onInput(): void {
    this.searchService.updateSearchTerm(this.searchTerm);
  }

  onEnter(): void {
    if (this.router.url !== '/posts') {
      this.router.navigate(['/posts'], {
        queryParams: { searchTerm: this.searchTerm },
      });
    }
  }
}
