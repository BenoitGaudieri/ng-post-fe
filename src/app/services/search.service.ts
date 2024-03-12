import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchTerm = new BehaviorSubject<string>('');
  searchTerm$ = this._searchTerm.asObservable();
  private _currentPage = new BehaviorSubject<number>(1);
  currentPage$ = this._currentPage.asObservable();

  updateSearchTerm(term: string) {
    this._searchTerm.next(term);
    this.resetPagination();
  }

  private resetPagination(): void {
    this._currentPage.next(1);
  }

  setCurrentPage(page: number): void {
    this._currentPage.next(page);
  }

  getCurrentPage(): number {
    return this._currentPage.value;
  }
}
