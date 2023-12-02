import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss',
})
export class PaginationBarComponent implements OnInit {
  @Input() totalUsers: number = 0;
  @Input() usersCurrentPage: number = 1;
  @Output() pageNumberSetter = new EventEmitter<number>();

  usersPerPage: number = 10;

  entryStart: number = 1;
  entryEnd: number = 1;
  totalPages: number = 1;
  previousPageNumber: number = 1;
  nextPageNumber: number = 1;
  nextNextPageNumber: number = 1;
  previousPreviousPageNumber: number = 1;

  emitPageNumber(pageNumber: number) {
    this.pageNumberSetter.emit(pageNumber);
  }

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.totalPages / 10);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalUsers'] || changes['usersCurrentPage']) {
      this.entryStart = this.usersPerPage * (this.usersCurrentPage - 1) + 1;
      this.entryEnd =
        Math.min(
          Number(this.entryStart) + Number(this.usersPerPage),
          Number(this.totalUsers) + 1
        ) - 1;
      this.totalPages = Math.ceil(
        Number(this.totalUsers) / Number(this.usersPerPage)
      );
      this.previousPageNumber = Number(this.usersCurrentPage) - 1;
      this.previousPreviousPageNumber = Number(this.previousPageNumber) - 1;
      this.nextPageNumber = Number(this.usersCurrentPage) + 1;
      this.nextNextPageNumber = Number(this.nextPageNumber) + 1;
    }
  }
}
