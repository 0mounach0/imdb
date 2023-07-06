import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './services/data.service';
import { EditMovieModalComponent } from './components/edit-movie-modal/edit-movie-modal.component';
import { Movie } from './models/movie.model';

export enum LanguageId {
  fr = 'fr',
  en = 'en',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentPage = 1;
  public pageSize = 10;
  public totalPages!: number;
  public pageData!: Movie[];
  public jsonData!: Movie[];
  public filteredData!: Movie[];
  public searchQuery: string = '';
  public showModal: boolean = false; 
  public selectedMovie!: any;
  
  constructor(private translateService: TranslateService, private dataService: DataService) {
    this.translateService.setDefaultLang(LanguageId.en);
  }

  public switchLang(language: keyof typeof LanguageId): void {
    this.translateService.use(language);
  }

 

  public editMovie(movie: Movie): void {
    this.selectedMovie = { ...movie }; 
    this.showModal = true;
  }

  onModalClosed(updatedMovie: Movie): void {
    if (updatedMovie) {
      const index = this.pageData.findIndex((movie) => movie.tconst === updatedMovie.tconst);
      if (index !== -1) {
        this.pageData[index] = { ...updatedMovie };
        this.jsonData[index] = { ...updatedMovie };
      }
    }
    this.showModal = false;
    this.selectedMovie = null;
  }

  ngOnInit(): void {
    this.dataService.parseTSV().subscribe(
      jsonData => {
        this.jsonData = jsonData;
        this.totalPages = Math.ceil(jsonData.length / this.pageSize);
        this.filterData();
      },
      error => {
        console.error('Error parsing TSV file:', error);
      }
    );
  }

  filterData(): void {
    this.filteredData = this.jsonData.filter(item =>
      item?.primaryTitle?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.navigateToPage(1, this.filteredData);
    if(this.totalPages === 0) {
      this.pageData = [];
    }
  }

  getPageData(pageNumber: number, data: Movie[]): void {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageData = data.slice(startIndex, endIndex);
  }

  navigateToPage(pageNumber: number, data: Movie[]): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getPageData(this.currentPage, data);
    }
  }

  navigateToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.navigateToPage(this.currentPage - 1, this.filteredData);
    }
  }

  navigateToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.navigateToPage(this.currentPage + 1, this.filteredData);
    }
  }

  getPaginationNumbers(): number[] {
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  public bindSearchQuery(sQuery: string): void {
    this.searchQuery = sQuery;
    this.filterData();
  }
}
