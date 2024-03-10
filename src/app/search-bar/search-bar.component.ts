import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchTerm: string = '';

  constructor(private searchService: SearchService) {}

  onInput(): void {
    this.searchService.updateSearchTerm(this.searchTerm);
  }
}
