import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { MovieDetailComponent } from './movie-detail.component';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h2>{{title}}</h2>
      <div class="row grid-view">
        <div *ngFor="let movie of movies" (click)="showMovieDetails(movie)" class="col-md-3">
          <div class="movie">
            <img src="{{movie.imgPath}}" />
            <h3>{{movie.name}}</h3>
            <p>{{movie.duration}}</p>
            <p>User Rating: {{movie.userRating}}</p>
          </div>
        </div>
      </div>
      <my-movie-detail [movie]="selectedMovie"></my-movie-detail>
    </div>
  `,
  styles: [`
    .grid-view .movie {
      height: 500px;
      cursor: pointer;
    }
    .grid-view .movie img {
      height: 70%;
    }
  `],
  providers: [
    MovieService
  ],
  directives: [MovieDetailComponent]
})
export class AppComponent implements OnInit {
  title = 'Movie Listings @ GV Cinema';
  movies: Movie[] = [];
  selectedMovie: Movie;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe(
      data => {
        this.movies = data.movies;
      }
    )
  }

  showMovieDetails(movie:Movie) {
    this.selectedMovie = movie;
  }
}