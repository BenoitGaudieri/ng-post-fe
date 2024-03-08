import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private openCardSubject = new BehaviorSubject<number | null>(null);

  currentOpenCard = this.openCardSubject.asObservable();

  constructor() {}

  openCard(cardId: number) {
    this.openCardSubject.next(cardId);
  }

  closeCard() {
    this.openCardSubject.next(null);
  }
}
