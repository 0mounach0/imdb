import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() item!: Movie;
  @Output() $openEdit: EventEmitter<any>;


  constructor() { 
    this.$openEdit = new EventEmitter();
  }

  ngOnInit(): void {
  }

}
