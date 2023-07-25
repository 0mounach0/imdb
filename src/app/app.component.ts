import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './services/data.service';
import { Movie } from './models/movie.model';
import { flatMap, split, uniq } from 'lodash';

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
  public pageSize = 12;
  public totalPages!: number;
  public pageData!: Movie[];
  public jsonData!: Movie[];
  public filteredData!: Movie[];
  public searchQuery: string = '';
  public showModal: boolean = false; 
  public selectedMovie!: any;
  public distinctGenres!: string[];
  
  constructor(private translateService: TranslateService, private dataService: DataService) {
    this.translateService.setDefaultLang(LanguageId.en);
  }

  public ngOnInit(): void {
    this.dataService.parseTSV().subscribe(
      jsonData => {
        this.jsonData = jsonData;
        this.totalPages = Math.ceil(jsonData.length / this.pageSize);
        this.filterData();
        this.distinctGenres = this.getDistinctGenres();
      },
      error => {
        console.error('Error parsing TSV file:', error);
      }
    );
  }

  public switchLang(language: keyof typeof LanguageId): void {
    this.translateService.use(language);
  }

  private getDistinctGenres(): string[] {
    const genres = flatMap(this.jsonData, 'genres');
    const trimmedGenres = flatMap(genres, genre => split(genre, ','));
    const uniqueGenres = uniq(trimmedGenres.map(genre => genre.trim()));
    return uniqueGenres;
  }

  public editMovie(movie: Movie): void {
    this.selectedMovie = { ...movie }; 
    this.showModal = true;
  }

  public onModalClosed(updatedMovie: Movie): void {
    if (updatedMovie) {
      const index = this.pageData.findIndex((movie) => movie.tconst === updatedMovie.tconst);
      if (index !== -1) {
        this.pageData[index] = { ...updatedMovie };
        this.filteredData[index] = { ...updatedMovie };
        this.jsonData[index] = { ...updatedMovie };
      }
    }
    this.showModal = false;
    this.selectedMovie = null;
  }

  public filterData(): void {
    this.filteredData = this.jsonData.filter(item =>
      item?.primaryTitle?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.navigateToPage(1, this.filteredData);
    if(this.totalPages === 0) {
      this.pageData = [];
    }
  }

  public getPageData(pageNumber: number, data: Movie[]): void {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageData = data.slice(startIndex, endIndex);
  }

  public navigateToPage(pageNumber: number, data: Movie[]): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getPageData(this.currentPage, data);
    }
  }

  public navigateToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.navigateToPage(this.currentPage - 1, this.filteredData);
    }
  }

  public navigateToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.navigateToPage(this.currentPage + 1, this.filteredData);
    }
  }

  public getPaginationNumbers(): number[] {
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  public bindSearchQuery(sQuery: string): void {
    this.searchQuery = sQuery;
    this.filterData();
  }
}
