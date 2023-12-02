import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { user } from '../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
})
export class ListViewComponent implements OnChanges {
  @Input() usersList: user[] = [];
  @Input() pageNumber: number = 1;
  showList: user[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageNumber'] || changes['usersList']) {
      const entryStart = 10 * (this.pageNumber - 1);
      const entryEnd = Math.min(
        Number(entryStart) + Number(10),
        Number(this.usersList.length) + 1
      );
      this.showList = this.usersList.slice(entryStart, entryEnd);
    }
  }
}
