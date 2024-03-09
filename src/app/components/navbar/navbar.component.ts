import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() themeToggle = new EventEmitter<void>();
  @Input() theme: 'light' | 'dark' = 'light';

  toggleTheme() {
    this.themeToggle.emit();
  }
}
