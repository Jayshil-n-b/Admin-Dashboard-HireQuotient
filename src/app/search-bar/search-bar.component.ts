import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchQuery: string = '';
  @Output() searchQuerySetter = new EventEmitter<string>();
  @Output() deleteEventEmitter = new EventEmitter();

  emitSearchQuery() {
    this.searchQuerySetter.emit(this.searchQuery);
  }

  emitDelete() {
    this.deleteEventEmitter.emit();
  }
}
