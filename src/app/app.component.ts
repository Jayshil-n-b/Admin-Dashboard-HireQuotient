import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Subscription } from 'rxjs';
import { ApiService } from './services/api.service';
import { user } from './user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'hireQuotient-internship-challenge-23';
  searchQuery: string = '';
  subscription!: Subscription;
  usersData: user[] | any = [];

  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiService.getUsers().subscribe((data) => {
      this.usersData = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
