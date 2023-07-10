import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'edit-movie-modal',
  templateUrl: './edit-movie-modal.component.html',
  styleUrls: ['./edit-movie-modal.component.scss']
})
export class EditMovieModalComponent implements OnInit, OnChanges {

  @Input() isOpen = false; 
  @Input() movie!: Movie;
  @Input() distinctGenres!: string[];
  @Output() closed: EventEmitter<any> = new EventEmitter<any>(); // Output event to emit when the modal is closed
  public updatedMovie!: Movie;
  public ckYes!: boolean;
  public ckNo!: boolean;
  public years: number[] = [];
  
  constructor() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1700; year--) {
      this.years.push(year);
    }
  }
  
  public ngOnInit(): void {
      this.updatedMovie = { ...this.movie };
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.movie) {
      const currentValue = changes.movie.currentValue;
      this.updatedMovie = { ...currentValue };
      this.ckYes = this.updatedMovie.isAdult == 0 ? false: true;
      this.ckNo = this.updatedMovie.isAdult == 0 ? true: false;
    }
  }

  public selectOptionIsAdult(option: number) {
    this.ckYes = option == 0 ? false: true;
    this.ckNo = option == 0 ? true: false;
    this.updatedMovie.isAdult = option;
  }

  public updateSelectedGenres(): void {
    try {
      this.updatedMovie.genres = this.selectedGenresArray.join(', ');
    } catch (error) {
    }
  }

  get selectedGenresArray(): string[] {
    return this.updatedMovie.genres.split(',').map(genre => genre.trim());
  }

  public closeModal(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  public cancelChanges(): void {
    this.isOpen = false;
    this.closed.emit(null); // Emit null to indicate cancellation
  }

  public saveChanges(): void {
    this.isOpen = false;
    this.closed.emit(this.updatedMovie); // Emit the updated movie data
  }

}
