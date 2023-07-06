import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'imdb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  _currentPage: number = 1;
  get currentPage(): number {
      return this._currentPage;
  }
  @Input() set currentPage(value: number) {
      this._currentPage = value;
  }

  _pageSize: number = 10;
  get pageSize(): number {
      return this._pageSize;
  }
  @Input() set pageSize(value: number) {
      this._pageSize = value;
  }

  _totalPages: number = 0;
  get totalPages(): number {
      return this._totalPages;
  }
  @Input() set totalPages(value: number) {
      this._totalPages = value;
  }

  @Output() $navigateToPage: EventEmitter<number>;
  @Output() $navigateToPreviousPage: EventEmitter<void>;
  @Output() $navigateToNextPage: EventEmitter<void>;

  constructor() {
    this.$navigateToPage = new EventEmitter();
    this.$navigateToPreviousPage = new EventEmitter();
    this.$navigateToNextPage = new EventEmitter();
   }

  ngOnInit(): void {
  }

  navigateToPage(pageNumber: number): void {
    this.$navigateToPage.emit(pageNumber);
  }

  navigateToPreviousPage(): void {
    this.$navigateToPreviousPage.emit();
  }

  navigateToNextPage(): void {
    this.$navigateToNextPage.emit();
  }

  getPaginationNumbers(): number[] {
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}