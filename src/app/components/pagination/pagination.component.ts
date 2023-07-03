import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'imdb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  currentPage = 1;
  pageSize = 10;
  totalPages!: number;
  pageData!: any[];

  constructor(private dataService: DataService) { }

  jsonData!: any[];


  ngOnInit(): void {
    this.dataService.parseTSV().subscribe(
      jsonData => {
        this.jsonData = jsonData;
        // Perform further processing or actions with the parsed JSON data
        this.totalPages = Math.ceil(jsonData.length / this.pageSize);
        this.getPageData(this.currentPage);
      },
      error => {
        console.error('Error parsing TSV file:', error);
      }
    );
  }

  getPageData(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageData = this.jsonData.slice(startIndex, endIndex);
  }

  navigateToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getPageData(this.currentPage);
    }
  }

  navigateToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.navigateToPage(this.currentPage - 1);
    }
  }

  navigateToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.navigateToPage(this.currentPage + 1);
    }
  }

  getPaginationNumbers(): number[] {
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}