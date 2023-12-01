import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'hireQuotient-internship-challenge-23';
  searchQuery: string = '';

  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
  }
}
