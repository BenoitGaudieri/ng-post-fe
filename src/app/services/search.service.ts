import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchTerm = new BehaviorSubject<string>('');
  searchTerm$ = this._searchTerm.asObservable();
  private _currentPage = new BehaviorSubject<number>(1);
  currentPage$ = this._currentPage.asObservable(); // Observable for current page

  updateSearchTerm(term: string) {
    this._searchTerm.next(term);
    this.resetPagination(); // Reset pagination every time a new search term is set
  }

  // Reset the current page to 1
  private resetPagination(): void {
    this._currentPage.next(1);
  }

  // Update the current page
  setCurrentPage(page: number): void {
    this._currentPage.next(page);
  }

  // Getter for the current page value
  getCurrentPage(): number {
    return this._currentPage.value;
  }
}
