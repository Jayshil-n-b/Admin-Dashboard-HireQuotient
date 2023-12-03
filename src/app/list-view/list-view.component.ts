import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { user } from '../user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
})
export class ListViewComponent implements OnChanges {
  @Input() usersList: user[] = [];
  @Input() pageNumber: number = 1;
  @Output() deleteEmitter = new EventEmitter<string>();
  showList: user[] = [];
  targetUser: string = '';
  checkedSet: Set<string> = new Set();

  deleteUser(id: string) {
    this.deleteEmitter.emit(id);
  }

  editUser(id: string) {
    this.targetUser = id;
  }

  saveUser(id: string) {
    this.targetUser = '';
  }

  handleCheckbox(event: any, id: string) {
    console.log(event.target.checked, id);
    if (id === '-') {
      const entryStart = 10 * (this.pageNumber - 1);
      const entryEnd =
        Math.min(
          Number(entryStart) + Number(10),
          Number(this.usersList.length) + 1
        ) - 1;
      for (let index = entryStart; index <= entryEnd + 1; index++) {
        event.target.checked
          ? this.checkedSet.add(String(index))
          : this.checkedSet.delete(String(index));
      }
    } else {
      event.target.checked
        ? this.checkedSet.add(id)
        : this.checkedSet.delete(id);
    }
    console.log(this.checkedSet.size);
  }

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
