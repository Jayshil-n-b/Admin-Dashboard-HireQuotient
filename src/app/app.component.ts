import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Subscription } from 'rxjs';
import { ApiService } from './services/api.service';
import { user } from './user';
import { ListViewComponent } from './list-view/list-view.component';
import { PaginationBarComponent } from './pagination-bar/pagination-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SearchBarComponent,
    ListViewComponent,
    PaginationBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'hireQuotient-internship-challenge-23';
  searchQuery: string = '';
  subscription!: Subscription;
  usersData: user[] | any = [];
  filteredData: user[] | any = [];
  currentPage: number = 1;
  checkedSet: Set<string> = new Set<string>();

  handleSetChange(newSet: Set<string>) {
    this.checkedSet = newSet;
    console.log(newSet);
  }

  deleteSelectedUsers() {
    this.usersData = this.usersData.filter((userData: user) => {
      return !this.checkedSet.has(userData.id);
    });
    this.checkedSet.clear();
    this.setSearchQuery(this.searchQuery);
  }

  deleteUser(id: string) {
    this.usersData = this.usersData.filter((userData: user) => {
      return userData.id !== id;
    });
    this.setSearchQuery(this.searchQuery);
  }

  setSearchQuery(searchQuery: string) {
    searchQuery = searchQuery.toLowerCase();
    this.searchQuery = searchQuery;
    this.setCurrentPage(1);
    this.filteredData = this.usersData.filter((userData: user) => {
      if (
        userData.name.toLowerCase().includes(searchQuery) ||
        userData.email.toLowerCase().includes(searchQuery) ||
        userData.role.toLowerCase().includes(searchQuery)
      ) {
        return true;
      } else {
        return false;
      }
    });
    console.log(this.filteredData);
  }

  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
    console.log(this.currentPage);
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiService.getUsers().subscribe(
      (data) => {
        this.usersData = data;
        this.filteredData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
