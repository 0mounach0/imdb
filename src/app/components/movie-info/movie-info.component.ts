import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'movie-info-list',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {

  _infoProperties!: Movie;
  get infoProperties(): Movie {
      return this._infoProperties;
  }
  @Input() set infoProperties(value: Movie) {
      this._infoProperties = value;
  }

  public readonly allowedProperties: string[] = ['tconst', 'runtimeMinutes', 'startYear', 'endYear', 'isAdult', 'genres'];

  constructor() { }

  ngOnInit(): void {
  }

}
